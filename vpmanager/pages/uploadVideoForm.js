import { useState,useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

const UploadVideoForm = () => {

  const {user} = useUser()

  const [video, setVideo] = useState(null);
  const [videoName, setVideoName] = useState('');
  const [info, setInfo] = useState({
    titulo: '',
    categoria: '',
    descripcion: '',
    url: '',
    fechaSubida: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const handleVideoChange = (event) => {
    setVideo(event.target.files[0]);
    setVideoName(event.target.files[0].name);

    // Asignar automáticamente el nombre del archivo al campo de título
    setInfo((prevInfo) => ({
      ...prevInfo,
      titulo: event.target.files[0].name
    }));
  };

  const handleVideoUpload = async (event) => {
    if (event) {
      event.preventDefault();
    }
  
    const formData = new FormData();
    formData.append('file', video);
    formData.append('upload_preset', 'saultest1');
  
    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/saul115/video/upload',
        formData
      );
  
      setInfo((prevInfo) => ({
        ...prevInfo,
        url: response.data.url,
        fechaSubida: response.data.created_at
      }));
  
      console.log("INFO U --> ", info); // La URL debería mostrarse aquí ahora
  
      // Guardar el nuevo objeto de video en la base de datos
      const postResponse = await axios.post("/api/posts", {
        titulo: info.titulo,
        categoria: info.categoria,
        descripcion: info.descripcion,
        url: response.data.url,
        fechaSubida: response.data.created_at
      });
  
      if (postResponse.status === 201) {
        console.log("info guardada exitosamente");
      } else {
        console.log("error al guardar exitosamente");
      }
    } catch (error) {
      console.error('Error al guardar datos en la base de datos:', error);
    }
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault()

   

    try{

      await handleVideoUpload()

      console.log("INFO U --> ",info);

      const response = await axios.post("/api/posts",info)

      if(response.status == 201)
      {
        console.log("info guardada existosamente")
      }else{
        console.log("error al guard existosamente")
      }

      


    }catch(error)
    {
      console.error('Error al guardar datos en la base de datos:', error)
    }
  }

  // Utilizamos useEffect para mostrar los valores actualizados de info
  useEffect(() => {
    console.log("New Video Info:", info);
  }, [info]);

  return (
    <>


    {!!user ? (<>
    

      <Link href="/api/auth/logout" >Logout</Link>
      <div><strong>Escoge un Video</strong></div>
     
     <form onSubmit={handleVideoUpload}>
       <div>
         <input type="file" accept="video/*" onChange={handleVideoChange} />
         <label>{videoName}</label>
       </div>
       
       <br/>
       {/* Info UI and Data */}
       <Form.Group className="mb-3" controlId="titulo">
         <Form.Label>Título</Form.Label>
         <Form.Control
           type="text"
           name="titulo"
           value={info.titulo}
           onChange={handleChange}
           required
         />
       </Form.Group>
       <Form.Group className="mb-3" controlId="categoria">
         <Form.Label>Categoría</Form.Label>
         <Form.Select
           name="categoria"
           value={info.categoria}
           onChange={handleChange}
           required
         >
           <option value="">Seleccione una opción</option>
           <option value="Tips">Tips</option>
           <option value="Sabias Que?">Sabias Que?</option>
           <option value="Tratamientos">Tratamientos</option>
           <option value="Historias de Exito">Historias de Exito</option>
         </Form.Select>
       </Form.Group>
       <Form.Group className="mb-3" controlId="descripcion">
         <Form.Label>Descripción</Form.Label>
         <Form.Control
           as="textarea"
           name="descripcion"
           value={info.descripcion}
           onChange={handleChange}
           required
         />
       </Form.Group>

       <Button type="submit" variant="primary">
         Guardar
       </Button>
     </form>
    
    
      
    
    
    </>) : (<>
    


      <div><strong>Escoge un Video</strong></div>
    
    
    
    
    
    
    </>)}

      
    </>
  );
};

export default UploadVideoForm;
