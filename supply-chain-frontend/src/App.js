import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Card,
  CardContent,
  CardActions,
  Grid,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import getWeb3 from "./blockchain";
import getContract from "./SupplyChainContract";

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const contract = await getContract(web3);
        setWeb3(web3);
        setAccounts(accounts);
        setContract(contract);

        const productCount = await contract.methods.productCount().call();
        const products = [];
        for (let i = 1; i <= productCount; i++) {
          const product = await contract.methods.getProduct(i).call();
          products.push({
            id: i,
            name: product[0],
            price: web3.utils.fromWei(product[1], "ether"),
            owner: product[2],
            dateTime: new Date(parseInt(product[3]) * 1000).toLocaleString(),
          });
        }
        setProducts(products);
      } catch (error) {
        console.error("Blockchain error:", error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    price: Yup.number().required("Price is required").positive("Must be positive"),
  });

  const handleAddProduct = async (values, { setSubmitting, resetForm }) => {
    try {
      setLoading(true);
      await contract.methods
        .addProduct(values.name, web3.utils.toWei(values.price, "ether"))
        .send({ from: accounts[0], gas: 3000000 });

      const productCount = await contract.methods.productCount().call();
      const product = await contract.methods.getProduct(productCount).call();
      setProducts([...products, {
        id: productCount,
        name: product[0],
        price: web3.utils.fromWei(product[1], "ether"),
        owner: product[2],
        dateTime: new Date(parseInt(product[3]) * 1000).toLocaleString(),
      }]);
      resetForm();
      setNotification({ open: true, message: "Product added!", severity: "success" });
    } catch (error) {
      setNotification({ open: true, message: "Error adding product!", severity: "error" });
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        🛒 Supply Chain DApp
      </Typography>

      <Card sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h6">Add a New Product</Typography>
        <Formik
          initialValues={{ name: "", price: "" }}
          validationSchema={validationSchema}
          onSubmit={handleAddProduct}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field as={TextField} name="name" label="Product Name" fullWidth margin="normal" />
              <ErrorMessage name="name" component="div" style={{ color: "red" }} />
              <Field as={TextField} type="number" name="price" label="Price (ETH)" fullWidth margin="normal" />
              <ErrorMessage name="price" component="div" style={{ color: "red" }} />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                sx={{ marginTop: 2 }}
              >
                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Add Product"}
              </Button>
            </Form>
          )}
        </Formik>
      </Card>

      {loading && <CircularProgress sx={{ display: "block", margin: "auto" }} />}
      <Typography variant="h6">📦 Product List</Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2">💰 {product.price} ETH</Typography>
                <Typography variant="body2">⏳ {product.dateTime}</Typography>
                <Typography variant="body2">👤 {product.owner.substring(0, 6)}...{product.owner.slice(-4)}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">View Details</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar open={notification.open} autoHideDuration={4000} onClose={() => setNotification({ ...notification, open: false })}>
        <Alert severity={notification.severity} sx={{ width: "100%" }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
