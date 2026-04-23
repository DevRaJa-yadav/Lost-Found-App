import { useState, useEffect } from "react";
import axios from "axios";

const API = "https://lost-found-backend-nt3y.onrender.com";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLogin, setIsLogin] = useState(true);

  const [nameInput, setNameInput] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [items, setItems] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");

  // 🔐 AUTH
  const login = async () => {
    const res = await axios.post(`${API}/api/login`, { email, password });
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
  };

  const register = async () => {
    await axios.post(`${API}/api/register`, {
      name: nameInput,
      email,
      password
    });
    alert("Registered Successfully");
    setIsLogin(true);
  };

  // 📦 ITEMS
  const fetchItems = async () => {
    const res = await axios.get(`${API}/api/items`, {
      headers: { Authorization: token }
    });
    setItems(res.data);
  };

  const addItem = async () => {
    await axios.post(
      `${API}/api/items`,
      { name, description, type, location, contact },
      { headers: { Authorization: token } }
    );

    fetchItems();

    setName("");
    setDescription("");
    setType("");
    setLocation("");
    setContact("");
  };

  useEffect(() => {
    if (token) fetchItems();
  }, [token]);

  // 🔐 AUTH UI
  if (!token) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2>{isLogin ? "Login" : "Register"}</h2>

          {!isLogin && (
            <input
              style={styles.input}
              placeholder="Name"
              onChange={(e) => setNameInput(e.target.value)}
            />
          )}

          <input
            style={styles.input}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {isLogin ? (
            <button style={styles.primary} onClick={login}>
              Login
            </button>
          ) : (
            <button style={styles.primary} onClick={register}>
              Register
            </button>
          )}

          <p style={{ marginTop: "10px" }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>

          <button
            style={styles.toggle}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Go to Register" : "Go to Login"}
          </button>
        </div>
      </div>
    );
  }

  // 📊 DASHBOARD
  return (
    <div style={styles.container}>
      <div style={styles.dashboard}>
        <div style={styles.header}>
          <h2>Dashboard</h2>
          <button
            style={styles.logout}
            onClick={() => {
              localStorage.clear();
              setToken(null);
            }}
          >
            Logout
          </button>
        </div>

        {/* FORM */}
        <div style={styles.form}>
          <input style={styles.input} placeholder="Item Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input style={styles.input} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

          <select style={styles.input} value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Select Type</option>
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>

          <input style={styles.input} placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
          <input style={styles.input} placeholder="Contact Info" value={contact} onChange={(e) => setContact(e.target.value)} />

          <button style={styles.primary} onClick={addItem}>
            Add Item
          </button>
        </div>

        {/* LIST */}
        <div style={styles.list}>
          {items.map((item) => (
            <div key={item._id} style={styles.item}>
              <h3>{item.name}</h3>
              <p><b>Description:</b> {item.description}</p>
              <p><b>Type:</b> {item.type}</p>
              <p><b>Location:</b> {item.location}</p>
              <p><b>Contact:</b> {item.contact}</p>
              <p><b>Date:</b> {new Date(item.date).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 🎨 STYLES
const styles = {
  container: {
    minHeight: "100vh",
    background: "#eef2f7",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    width: "320px",
    padding: "25px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    textAlign: "center"
  },
  dashboard: {
    width: "450px",
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  primary: {
    width: "100%",
    padding: "10px",
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px"
  },
  toggle: {
    background: "none",
    border: "none",
    color: "#007bff",
    cursor: "pointer"
  },
  logout: {
    background: "red",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    cursor: "pointer"
  },
  form: {
    marginTop: "15px"
  },
  list: {
    marginTop: "20px"
  },
  item: {
    background: "#f9f9f9",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "6px"
  }
};