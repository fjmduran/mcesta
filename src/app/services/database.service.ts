import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { enableIndexedDbPersistence } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
    
  constructor(private afs: AngularFirestore) {     
    enableIndexedDbPersistence(this.afs.firestore)
      .then(() => {
        console.log('✅ Persistencia habilitada en el índice de la base de datos');
      })
      .catch((error) => {
        console.error('❌ Error al habilitar la persistencia en el índice de la base de datos: ', error);
      });
  }

  public getDatabase(){
    return this.afs
  }
}

