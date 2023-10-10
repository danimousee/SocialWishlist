import { Field, Form, Formik } from 'formik';
import { useDispatch } from "react-redux";
import { addProduct } from '../../firebase/queries/products';
import { Container, H2 } from '../../components/Styles.css';

const Add = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
   dispatch(addProduct(values))
  }

  return(
    <Formik
    initialValues={{
        title: '',
        description: '',
        images: '',
      }}
      onSubmit={handleSubmit}
      >
      <Form>
        <H2 >Cargue su producto</H2>
      <Container>
        <Field className="text-field" id="title" name="title" placeholder="Titulo"  />

        <Field className="text-field" id="description" name="description" placeholder="Descripcion"  />

    {/*     <Field
          id="images"
          name="images"
          placeholder="jane@acme.com"
          type="images"
        /> */}
  </Container>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
)};

export default Add;