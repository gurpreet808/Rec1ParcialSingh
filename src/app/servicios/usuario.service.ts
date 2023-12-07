import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CollectionReference, DocumentData, Firestore, collection, doc, setDoc, collectionData, Query, deleteDoc } from '@angular/fire/firestore';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarios: BehaviorSubject<Usuario[]> = new BehaviorSubject<Usuario[]>([]);
  admins: BehaviorSubject<Usuario[]> = new BehaviorSubject<Usuario[]>([]);
  firstLoad: boolean = true;

  pathUrl: string = 'usuarios';
  dataRef: CollectionReference<DocumentData, DocumentData> = collection(this.firestore, this.pathUrl);

  constructor(private firestore: Firestore) {
    this.TraerUsuarios();
  }

  TraerUsuarios() {

    let query: Query<Usuario, DocumentData> = this.dataRef as Query<Usuario, DocumentData>;
    collectionData<Usuario>(query, { idField: 'id' }).subscribe(
      (usuarios: Usuario[]) => {
        //console.log("usuarios", usuarios);

        let admins: Usuario[] = [];

        usuarios.sort(
          (a: Usuario, b: Usuario) => {
            return a.apellido.localeCompare(b.apellido);
          }
        )

        usuarios.forEach(
          (usuario: Usuario) => {
            if (usuario.perfil == 'admin') {
              admins.push(usuario);
            }
          }
        );

        this.firstLoad = false;

        this.admins.next(admins);

        this.usuarios.next(usuarios);
      }
    );
  }

  async AgregarUsuario(usuario: Usuario) {
    if (usuario === null) {
      return Promise.reject('Usuario nulo');
    };

    if (this.usuarios.value.find((user: Usuario) => user.email === usuario.email)) {
      return Promise.reject('Mail en uso');
    };

    let docRef = doc(this.dataRef);
    usuario.id = docRef.id;
    return setDoc(docRef, usuario);
  }

  ModificarUsuario(usuario: Usuario) {
    if (usuario === null) {
      return Promise.reject('Usuario nulo');
    };

    if (this.usuarios.value.find((user: Usuario) => user.email === usuario.email && user.id !== usuario.id)) {
      return Promise.reject('Mail en uso');
    };

    let docRef = doc(this.dataRef, usuario.id);
    return setDoc(docRef, usuario);
  }

  async BorrarUsuario(id: string) {
    if (id === null) {
      return Promise.reject('ID nulo');
    };

    /* await this.servAuth.BorraUsuario(id).then(
      (rta) => {
        console.log(rta);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    ); */

    let docRef = doc(this.dataRef, id);
    return deleteDoc(docRef);
  }

  async BuscarUsuarioPorId(id: string): Promise<Usuario> {
    if (id === null) {
      return Promise.reject('ID nulo');
    };

    let aux_usuarios: Usuario[] = JSON.parse(JSON.stringify(this.usuarios.value));

    for (let i = 0; i < aux_usuarios.length; i++) {
      if (aux_usuarios[i].id == id) {
        return aux_usuarios[i];
      }
    }

    throw new Error('Usuario no encontrado');
  }

  ExisteMail(mail: string): boolean {
    let rta: boolean = false;
    let aux_usuarios: Usuario[] = JSON.parse(JSON.stringify(this.usuarios.value));

    for (let i = 0; i < aux_usuarios.length; i++) {
      if (aux_usuarios[i].email == mail) {
        rta = true;
        break;
      }
    }

    return rta;
  }

}
