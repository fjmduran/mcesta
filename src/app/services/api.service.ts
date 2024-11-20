import { ICesta } from "src/app/models/ICesta";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { IGrupo } from "../models/IGrupo";
import { IProducto } from "../models/IProducto";

import { getIdFromName } from "../../../../common/src/helpers/id.helper";
import { DatabaseService } from "./database.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private afs: DatabaseService, private _snackBar: MatSnackBar) {
    
  }

  public GetCesta(id: string): Observable<ICesta> {
    return this.afs
      .getDatabase()
      .doc<ICesta>("/cestas/" + id)
      .snapshotChanges()
      .pipe(
        map((action) => {
          if (action.payload.exists == false) {
            return null;
          } else {
            const data = action.payload.data() as ICesta;
            const id = action.payload.id;
            return { id, ...data };
          }
        })
      );
  }

  public SaveCesta(cesta: ICesta): string {
    if (cesta.id == null) {
      cesta.id = new Date().getTime().toString();
      this.afs.getDatabase().collection("/cestas").doc(cesta.id).set(cesta);
    } else {
      this.afs
        .getDatabase()
        .doc("/cestas/" + cesta.id)
        .update(cesta);
    }
    return cesta.id;
  }

  public GetGruposCesta(idCesta: string): Observable<IGrupo[]> {
    return this.afs
      .getDatabase()
      .collection("/cestas/" + idCesta + "/grupos")
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((action) => {
            const data = action.payload.doc.data() as IGrupo;
            return data;
          });
        })
      );
  }

  public GetGrupo(idCesta: string, idGrupo: string): Observable<IGrupo> {
    return this.afs
      .getDatabase()
      .doc<IGrupo>("/cestas/" + idCesta + "/grupos/" + idGrupo)
      .snapshotChanges()
      .pipe(
        map((action) => {
          if (action.payload.exists == false) {
            return null;
          } else {
            const data = action.payload.data() as IGrupo;
            return data;
          }
        })
      );
  }

  public SaveGroup(grupo: IGrupo, idCesta: string): Promise<void> {
    if (!grupo.id) {
      const id: string = getIdFromName(grupo.nombre);
      grupo.id = id;
      return this.afs
        .getDatabase()
        .collection("/cestas/" + idCesta + "/grupos")
        .doc(id)
        .set(grupo);
    } else {
      return this.afs
        .getDatabase()
        .doc("/cestas/" + idCesta + "/grupos/" + grupo.id)
        .update(grupo);
    }
  }

  public SaveProductS(
    productos: IProducto[],
    grupos: IGrupo[],
    idCesta: string,
    cleanProducts = false
  ) {
    let nameOfProductsToBuy;
    const groupsToSave = [];

    for (let p of productos) {
      if (!nameOfProductsToBuy) {
        nameOfProductsToBuy = `✅ ${p.nombre}`;
      } else {
        nameOfProductsToBuy = `${nameOfProductsToBuy}, ${p.nombre}`;
      }

      const groupOfproduct = grupos.find((g) => g.id === p.idGrupo);
      const checkExistGroupToSave = groupsToSave.find(
        (g) => g === groupOfproduct
      );
      if (groupOfproduct && !checkExistGroupToSave)
        groupsToSave.push(groupOfproduct);
    }

    for (let group of groupsToSave) {
      this.SaveGroup(group, idCesta);
    }

    nameOfProductsToBuy += " a la lista";
    if (!cleanProducts)
      this._snackBar.open(nameOfProductsToBuy, "Cerrar", { duration: 5000 });
  }
}
