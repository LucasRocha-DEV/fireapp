import React, { useState } from 'react';
import { db } from './firebaseConnection';
import { collection, addDoc, doc, getDoc ,getDocs, updateDoc, deleteDoc, writeBatch} from 'firebase/firestore';
import './app.css';

function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [idpost, setIdPost] = useState('');


  const [posts, setPosts] = useState([]);

  async function handleAdd() {
    // Comentário explicativo sobre o uso de setDoc com ID fixo
    // Este bloco de código usa setDoc para adicionar um documento com um ID fixo ("post1").
    // await setDoc(doc(db, "posts", "post1"), {
    //   titulo: titulo,
    //   autor: autor,
    // })
    // .then(() => {
    //   console.log("DADOS REGISTRADO NO BANCO COM SUCESSO!");
    //   setTitulo('');
    //   setAutor('');
    // })
    // .catch((error) => {
    //   console.error("GEROU ERRO" + error);
    // });

    // Novo código usando addDoc para gerar automaticamente o ID do documento
    try {
      await addDoc(collection(db, "posts"), {
        titulo: titulo,
        autor: autor,
      });
      console.log("DADOS REGISTRADO NO BANCO COM SUCESSO!");
      setTitulo('');
      setAutor('');
    } catch (error) {
      console.error("GEROU ERRO: " + error);
    }
  }

  async function BuscarPost() {
  //   const postRef = doc(db, "posts", "TRUeENkStVJ1msDi2RPp");

  //   await getDoc(postRef)
  //     .then((snapshot) => {
  //       setAutor(snapshot.data().autor);
  //       setTitulo(snapshot.data().titulo);
  //     })
  //     .catch((error) => {
  //       console.error("GEROU ERRO: " + error);
  //     });
  // }

  const postsRef = collection(db, "posts");
 await getDocs(postsRef)
    .then((snapshot) => {
      let lista = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor,
        });
      });

      setPosts(lista);
    })

    .catch((error) => {
      console.log("GEROU ERRO");
    });
}
     

  async function editaPost() {
    alert('Função em desenvolvimento');
    const docRef = doc(db, "posts", idpost);

    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor,
    })
      .then(() => {
        console.log("Post atualizado com sucesso!");
        setIdPost('');
        setTitulo('');
        setAutor('');
      })
      .catch((error) => {
        alert("Erro ao atualizar o post: " + error);
      });
  }
  
  
  async function handleDeleteAll() {
    const postsRef = collection(db, "posts");
    const snapshot = await getDocs(postsRef);

    try {
      const batch = writeBatch(db);
      snapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      console.log("TODOS OS POSTS FORAM DELETADOS!");
      setPosts([]); // Limpar o estado dos posts
    } catch (error) {
      console.error("GEROU ERRO AO DELETAR: " + error);
    }
  }

  async function excluirPost(id) {
    if (window.confirm('Deseja realmente excluir o post ' + id + '?')) {
      const docRef = doc(db, "posts", id);
      await deleteDoc(docRef)

        alert('Post excluido com sucesso!');
        BuscarPost();
      } else {
        alert('Operação cancelada!');
    }
  }

  return (


    <div>
      <h1>React + Firebase !</h1>
    
      <div className="container">

        <label>ID do Post</label>
        <input
          placeholder='Digite o ID do post'
          value={idpost}
          onChange={(e) => setIdPost(e.target.value)}
        />

        <label>Titulo:</label>
        <textarea
          typeof="text"
          placeholder='Digite o titulo do seu post'
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <br/> <br/>
        
        <label>Autor:</label>
        <input
          type="text" 
          placeholder='Digite o autor do post'
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />

        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={BuscarPost}>Buscar</button>

        <button onClick={editaPost}>Atualizar post</button>
        <button onClick={handleDeleteAll}>Deletar Todos</button>

        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <strong>ID: {post.id}</strong> <br/>
                <span>Titulo: {post.titulo}</span> <br/>
                <span>Autor: {post.autor}</span> <br/>
                <button onClick={() => excluirPost(post.id)}>Excluir</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
