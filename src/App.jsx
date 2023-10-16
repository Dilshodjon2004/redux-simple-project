import { Routes, Route } from "react-router-dom";
import { Main, Login, Register, Navbar, ArticleDetail } from "./components";
import { useEffect } from "react";
import AuthService from "./service/auth";
import { useDispatch } from "react-redux";
import { signUserSuccess } from "./slice/auth";
import { getItem } from "./helpers/persistence-storage";
import ArticleService from "./service/article";
import { getArticlesStart, getArticlesSuccess } from "./slice/article";

function App() {
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const response = await AuthService.getUser();
      dispatch(signUserSuccess(response.user));
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getArticles = async () => {
    dispatch(getArticlesStart());
    try {
      const response = await ArticleService.getArticles();
      // console.log(response);
      dispatch(getArticlesSuccess(response.articles));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = getItem("token");
    if (token) {
      getUser();
    }
    getArticles();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/article/:slug" element={<ArticleDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
