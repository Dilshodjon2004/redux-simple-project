import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getArticleDetailFailure,
  getArticleDetailStart,
  getArticleDetailSuccess,
  postArticleFailure,
  postArticleStart,
  postArticleSuccess,
} from "../slice/article";
import ArticleService from "../service/article";
import { useNavigate, useParams } from "react-router-dom";
import ArticleForm from "./ArticleForm";

const EditArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    const getArticleDetail = async () => {
      dispatch(getArticleDetailStart());
      try {
        const response = await ArticleService.getArticlesInfo(slug);
        setTitle(response.article.title);
        setDescription(response.article.description);
        setBody(response.article.body);
        // console.log(response);
        dispatch(getArticleDetailSuccess(response.article));
      } catch (error) {
        dispatch(getArticleDetailFailure());
      }
    };

    getArticleDetail();
  }, []);

  const formSubmit = async (e) => {
    e.preventDefault();
    dispatch(postArticleStart());
    const article = { title, description, body };
    try {
      await ArticleService.editArticle(slug, article);
      dispatch(postArticleSuccess());

      navigate("/");
    } catch (error) {
      dispatch(postArticleFailure());
      console.log(error);
    }
  };

  const formProps = {
    title,
    setTitle,
    description,
    setDescription,
    body,
    setBody,
    formSubmit,
  };
  return (
    <div className="text-center">
      <h1 className="fs-2">Edit article</h1>
      <div className="w-75 mx-auto">
        <ArticleForm {...formProps} />
      </div>
    </div>
  );
};

export default EditArticle;
