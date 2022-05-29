import { useState, useContext } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { getStringDate } from "../util/date";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

const Diary = () => {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert("없는 일기입니다");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="diaryPage">로딩중입니다...</div>;
  } else {
    return (
      <div className="diaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={
            <MyButton text={"<뒤로가기"} onClick={() => navigate(-1)} />
          }
          rightChild={
            <MyButton
              text={"수정하기"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
      </div>
    );
  }
};

export default Diary;
