import React, { useState } from 'react';
import { db } from './firebaseConnection';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';

function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');

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
    const postRef = doc(db, "posts", "post1");

    await getDoc(postRef)
      .then((snapshot) => {
        setAutor(snapshot.data().autor);
        setTitulo(snapshot.data().titulo);
      })
      .catch((error) => {
        console.error("GEROU ERRO: " + error);
      });
  }

  return (
    <div>
      <h1>React + Firebase !</h1>
    
      <div className="container">
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
      </div>
    </div>
  );
}

export default App;
