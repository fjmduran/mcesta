import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-frypto',
  templateUrl: './frypto.component.html',
  styleUrls: ['./frypto.component.css']
})
export class FryptoComponent implements OnInit {

  public Form: FormGroup;
  private uncode01: string = "abcdefghijklmnñopqrstuvwxyz0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ,.-;:_!·$%&()=?¿";
  private code01: string[] = [
    "2wvlHqM4·CñTXÑ,k-o=edZ6BijrcVJLuE.Y7&WgPSa95y¿_Q8Ux1D)mO0hsfG?KI(tAFzRn;%N$:p!b3",
    "lzH)i8$aLt_yVG2%UgS;:ovP1(E¿DRfK&se3mn0Fwkuj5WJT,7Zc6IM=b-Ñp!·AYñr9BC?QNXh4O.dqx",
    "!86Gg:hYu_0?O4$HPoIñR2Wi.etE9%LrwNsBcqJ5,faFz7&MTdÑZlbVDXy-¿KCv1pk;jnQSU(xA)3m=·",
    "Zkg_ÑLd.O(QI:r,qBemz%Yl;1&59JGWAnRM8?wb7cfKUFS4-C)ys6=T¿ap3PoDñhjuEtN0xvi!H$2XV·",
    "z=j!a3,ÑxN5deT(QHDp)&Msl4B7.FI0E?fXRCK¿;nPrLo$Y2uSOñWg%JU·16_biGq-c:ZtkVyv9mw8Ah",
    "P;EkrWu%RxYo1tOm4S&Bvj2whif$38:¿AGFg_cDZQT-q·HMXLC9pz.I7JnadU0VyK()=,5ñles!N6bÑ?",
    "TWfl-)&xbG·vY;EAOQDSqP%Vkz.I4_d2X,:c(8$LgUMÑ7ueRZysñ6FnaNr¿1jt!m953?hBCoKJHp=iw0",
    "xud1S-q=4EQk)lej:(L_NMHPZBUR;m·8yisJc97Cñ$p%I¿5Yar0OnfKTV2DogFtwWv!.&6bAGh,X3?zÑ",
    "2HyISeE,$Lq9?YW!RÑ%QpC=mhPO54;Awuc.)ZgJb¿dFB-8znUx0Vjr_X7i1(satfk:ñ&·MlGoTK3N6vD",
    "rP7YWf)!hi-n8¿xsZ31G4cyTt2w·aupe6$BRJ_HlX&mLqjVñI;voAzN0E,ÑK:d=%(SUFMDQ?.gC5O9kb",
  ];
  private uncode03: string = "abcdefghijklmnñopqrstuvwxyz0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ,.-;:_!·$%&()=?¿/";
  private code03: string[] = [
    "2/wvlHqM4·CñTXÑ,k-o=edZ6BijrcVJLuE.Y7&WgPSa95y¿_Q8Ux1D)mO0hsfG?KI(tAFzRn;%N$:p!b3",
    "lz/H)i8$aLt_yVG2%UgS;:ovP1(E¿DRfK&se3mn0Fwkuj5WJT,7Zc6IM=b-Ñp!·AYñr9BC?QNXh4O.dqx",
    "!86/Gg:hYu_0?O4$HPoIñR2Wi.etE9%LrwNsBcqJ5,faFz7&MTdÑZlbVDXy-¿KCv1pk;jnQSU(xA)3m=·",
    "Zkg_/ÑLd.O(QI:r,qBemz%Yl;1&59JGWAnRM8?wb7cfKUFS4-C)ys6=T¿ap3PoDñhjuEtN0xvi!H$2XV·",
    "z=j!a/3,ÑxN5deT(QHDp)&Msl4B7.FI0E?fXRCK¿;nPrLo$Y2uSOñWg%JU·16_biGq-c:ZtkVyv9mw8Ah",
    "P;EkrW/u%RxYo1tOm4S&Bvj2whif$38:¿AGFg_cDZQT-q·HMXLC9pz.I7JnadU0VyK()=,5ñles!N6bÑ?",
    "TWfl-)&/xbG·vY;EAOQDSqP%Vkz.I4_d2X,:c(8$LgUMÑ7ueRZysñ6FnaNr¿1jt!m953?hBCoKJHp=iw0",
    "xud1S-q=/4EQk)lej:(L_NMHPZBUR;m·8yisJc97Cñ$p%I¿5Yar0OnfKTV2DogFtwWv!.&6bAGh,X3?zÑ",
    "2HyISeE,$/Lq9?YW!RÑ%QpC=mhPO54;Awuc.)ZgJb¿dFB-8znUx0Vjr_X7i1(satfk:ñ&·MlGoTK3N6vD",
    "rP7YWf)!hi/-n8¿xsZ31G4cyTt2w·aupe6$BRJ_HlX&mLqjVñI;voAzN0E,ÑK:d=%(SUFMDQ?.gC5O9kb"
  ];

  constructor() { }

  ngOnInit() {
    this.Form = new FormGroup({
      encripta: new FormControl(null),
      desencripta: new FormControl(null),
    });
  }

  public Encripta01(): void {
    let e: string = this.Form.get("encripta").value;
    let resultado: string = "";

    //EN EL STRING DE UNCODE01 HAY 81 ELEMENTOS		
    //LA CLAVE CIFRADA ESTARÁ COMPUERTA POR LOS PRIMEROS 3 CARACTERES INSERVIBLES, EL CUARTO INDICARÁ EL INDICE DEL ARRAY DE CODE A USAR, 
    //DESPUÉS LA CLAVE

    //los tres primeros caracteres
    for (let i: number = 0; i <= 2; i++) {
      let z: number = Math.random() * 81;
      resultado = resultado + this.uncode01.charAt(z);
    }

    //OBTENGO UN VALOR ALEATORIO ENTRE 0 Y 9 (AMBOS INCLUIDOS), QUE ME DARÁ EL ÍNDICE DEL ARRAY A USAR DE CODE
    let indice: number = Math.trunc(Math.random() * 10);
    let strIndice: string = indice.toString();

    //OBTENGO EL INDEX DEL INDICE OBTENIDO EN UNCODE
    let indexIndice: number = this.uncode01.indexOf(strIndice);

    //AHORA LO CODIFICO SEGÚN EL ARRAY 0 DE CODE   
    let s: string = this.code01[0].charAt(indexIndice);
    resultado = resultado + s;

    //CODIFICO LA VARIABLE AENCRIPTAR
    for (let i: number = 0; i < e.length; i++) {
      let char: string = e.slice(i, i + 1);
      let index: number = this.uncode01.indexOf(char.toString());
      if (index == -1) {
        //SI LLEGO AQUÍ ES QUE NO SE HA ENCONTRADO EL CARÁCTER EN EL STRING DE UNCODE
        resultado = resultado + char;
      } else {
        resultado = resultado + this.code01[strIndice].charAt(index);
      }
    }

    //AHORA ANADO UN NÚMERO DE CARACTERES ALEATORIOS, ESE NÚMERO ES EL INDICE DEL ARRAY SELECCIONADO PARA LA ENCRIPTACIÓN
    let i: number = 1;
    while (i <= indice) {
      let r: number = Math.trunc((Math.random() * 10));
      resultado = resultado + this.code01[indice].charAt(r);
      i++;
    }
    this.Form.controls["desencripta"].setValue(resultado);
  }

  public Desencripta01(): void {
    let d: string = this.Form.get("desencripta").value;

    let resultado: string = null;
    if (d==null) return;
    resultado = "";

    let strIndiceArray: string = d.substring(3, 4);
    let IndiceArray: number = Number(this.DesEncriptaUno01(strIndiceArray, 0));

    let longitudClave: number = d.length - 4 - IndiceArray;
    let encriptado: string = d.substring(4, 4 + longitudClave);

    for (let i: number = 0; i < encriptado.length; i++) {
      let char: string = encriptado.slice(i, i + 1);
      resultado = resultado + this.DesEncriptaUno01(char, IndiceArray);
    }
    this.Form.controls["encripta"].setValue(resultado);
  }

  private DesEncriptaUno01(uno: string, numArray: number): string {

    let indexArray: number = this.code01[numArray].indexOf(uno);
    if (indexArray == -1) {
      //Si entro aquí significa que he usado un carácter que no está en el array, así que devuelvo el mismo carácter que ha entrado
      return uno;
    }
    let charIndexArray: string = this.uncode01.charAt(indexArray);
    return charIndexArray;
  }

  public Encripta03(): void {
    let e: string = this.Form.get("encripta").value;

    let resultado: string = "";

    //EN EL STRING DE UNCODE HAY 81 ELEMENTOS		
    
    //los tres primeros caracteres serán aleatorios
    for (let i: number = 0; i <= 2; i++) {
      let z: number = Math.trunc(Math.random() * 81);
      resultado = resultado + this.uncode03.charAt(z);
    }  

    //OBTENGO UN VALOR ALEATORIO ENTRE 0 Y 9 (AMBOS INCLUIDOS), QUE ME DARÁ EL ÍNDICE DEL ARRAY A USAR DE CODE
    let indice: number = Math.trunc(Math.random() * 10);
    let strIndice: string = indice.toString();

    //OBTENGO EL INDEX DEL INDICE OBTENIDO EN UNCODE
    let indexIndice: number = this.uncode03.indexOf(strIndice);

    //AHORA LO CODIFICO SEGÚN EL ARRAY 0 DE CODE   
    let s: string = this.code03[0].charAt(indexIndice);
    resultado = resultado + s;   

    //AHORA UN VALOR ALEATORIO
    for (let i: number = 0; i < 1; i++) {
      let z: number = Math.random() * 81;
      resultado = resultado + this.uncode03.charAt(z);
    }

    //AHORA OBTENGO LA LONGITUD DE LA CLAVE A ENCRIPTAR Y AÑADO EL PRIMER DÍGITO DE SU LONGITUD
    let lengthClave = e.length;    
    
    let primerN: number = Math.trunc(lengthClave / 10);
    let segundoN: number = lengthClave - primerN * 10;

    let strNum: string = primerN.toString();
    let indexNum: number = this.uncode03.indexOf(strNum);
    let charNum: string = this.code03[indice].charAt(indexNum);
    resultado = resultado + charNum;

    //AHORA NÚMERO ALEATORIO
    for (let i: number = 0; i < 1; i++) {
      let z: number = Math.trunc(Math.random() * 80);
      resultado = resultado + this.code03[Math.trunc(Math.random() * 10)].charAt(z);
    }

    //AHORA SEGUNDO DÍGITO DE LA LONGITUD DE LA CLAVE
    strNum = segundoN.toString();
    indexNum = this.uncode03.indexOf(strNum);
    charNum = this.code03[indice].charAt(indexNum);
    resultado = resultado + charNum;

    //AHORA DOS CARACTERES ALEATORIOS
    for (let i: number = 0; i <= 1; i++) {
      let z: number = Math.trunc(Math.random() * 80);
      resultado = resultado + this.code03[Math.trunc(Math.random() * 10)].charAt(z);
    }

    //Ahora codifico cada una de las letras de la palabra a encriptar
    let miIndice: number = indice;
    for (let i: number = 0; i < e.length; i++) {
      let char: string = e.slice(i, i + 1);
      let index: number = this.uncode01.indexOf(char.toString());
      if (index == -1) {
        //SI LLEGO AQUÍ ES QUE NO SE HA ENCONTRADO EL CARÁCTER EN EL STRING DE UNCODE
        resultado = resultado + char;
      } else {
        resultado = resultado + this.code03[miIndice].charAt(index);        
      }
      if (miIndice == 9) {
        miIndice = 0;
      } else {
        miIndice++;
      }
    }

    //AHORA ANADO UN NÚMERO DE CARACTERES ALEATORIOS, ESE NÚMERO ES EL INDICE DEL ARRAY SELECCIONADO PARA LA ENCRIPTACIÓN
    let i: number = 1;
    while (resultado.length < 50) {
      let r: number = Math.trunc((Math.random() * 80));
      resultado = resultado + this.code01[indice].charAt(r);
      i++;
    }
    this.Form.controls["desencripta"].setValue(resultado);
  }

  public Desencripta03(): void {
    let d: string = this.Form.get("desencripta").value;
    
    let resultado:string=null;
		if (d==null) return;
		resultado="";
		
		let strIndiceArray:string = d.substring(3,4);
    let IndiceArray:number = Number(this.DesEncriptaUno03(strIndiceArray,0));
		
    let strPrimerNum:string = this.DesEncriptaUno03(d.substring(5,6),IndiceArray);    
    let strSegunNum:string = this.DesEncriptaUno03(d.substring(7,8),IndiceArray);
    
    let lenghtClave:number = Number(strPrimerNum+strSegunNum);   		
		let clave:string = d.substring(10, 10 + lenghtClave);
		
		let miIndice:number=IndiceArray;
		for (let i: number = 0; i < lenghtClave; i++) {
			resultado=resultado + this.DesEncriptaUno03(clave.substr(i,1),miIndice);
			if (miIndice==9) {
				miIndice=0;
			}else {
				miIndice++;
			}
		}
		
		this.Form.controls["encripta"].setValue(resultado);

  }

  private DesEncriptaUno03(uno: string, numArray: number): string {

    let indexArray: number = this.code03[numArray].indexOf(uno);
    if (indexArray == -1) {
      //Si entro aquí significa que he usado un carácter que no está en el array, así que devuelvo el mismo carácter que ha entrado
      return uno;
    }
    let charIndexArray: string = this.uncode03.charAt(indexArray);
    return charIndexArray;
  }
}
