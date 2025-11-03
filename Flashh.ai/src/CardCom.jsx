import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
let userId = localStorage.getItem("userId")
if (!userId) {
  userId = crypto.randomUUID()
  localStorage.setItem("userId", userId)
}

export default function CardCom({subjectId}) {
  const [data, setdata] = useState([]);
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [flip, setFlip] = useState(false);
  const [editflip, seteditFlip] = useState(false);
  const [showform, setShowform] = useState(false);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
  async function tofetch() {
    const token = localStorage.getItem("token");

let url;
if (subjectId && subjectId !== "") {
  url = `https://flip-app.onrender.com/cards/${subjectId}`;
} else {
  url = `https://flip-app.onrender.com/cards/default`;
}


    const response = await fetch(url, {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` }
    });

    const finalres = await response.json();
    setdata(finalres);
   setIndex(0)

  }

  tofetch();
}, [subjectId]);


  const AddCard = async () => {
    const token = localStorage.getItem("token")
    if(!subjectId) return;
    const newCard = { question: question, answer: answer};
    const response = await fetch(`https://flip-app.onrender.com/cards/${subjectId}`, {
      method: "post",
      headers: { "content-type": "application/json",
        "Authorization": `Bearer ${token}`},
      body: JSON.stringify(newCard)
    })
    const saved = await response.json();
    setdata((prev)=>[...prev,saved]);
    setQuestion("");
    setAnswer("");
    setFlip(false);
    setShowform(false);
  };

  const formToggler = () => {
    setShowform(!showform);
  };
  const changequest = (e) => {
    setQuestion(e.target.value);
  };
  const changeans = (e) => {
    setAnswer(e.target.value);
  };
  const renderForm = () => {
    if (!showform) return null;
    return (
     <motion.div
      onDoubleClick={() => seteditFlip((prev) => !prev)}
      style={{ perspective: 1000 }}
      className="absolute w-70 h-110 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0, transition: { duration: 0.4 } }}
    >
      <motion.div
        animate={{ rotateY: editflip ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          position: "relative",
        }}
        className="border-3 border-violet-400 rounded-lg shadow-md flex flex-col items-center justify-self-center text-center p-4 bg-violet-300 text-black-500 relative"
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <input
            type="text"
            value={question}
            onChange={changequest}
            placeholder="Type your question"
            className="w-full h-full bg-inherit text-center outline-none text-lg font-semibold"
          />
        </div>
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <input
            type="text"
            value={answer}
            onChange={changeans}
            placeholder="Type your answer"
            className="w-full h-full bg-inherit text-center outline-none text-lg font-semibold"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              AddCard();
              seteditFlip(false);
              setQuestion("");
              setAnswer("");
              setShowform(false);
            }}
            className="mb-8 bg-violet-600 text-white px-3 py-1 rounded transform-none"
          >
            Done
          </button>
        </div>
      </motion.div>
    </motion.div>
    );
  };

  const indexIncrease = () => {
    if (index > data.length - 2) return;
    setDirection(1);
    setIndex((prev) => prev + 1);
    setFlip(false);
  };
  const indexDecrease = () => {
    if (index < 1) return;
    setDirection(-1);
    setIndex((prev) => prev - 1);
    setFlip(false);
  };
  const clickhandler = () => {
    setFlip((prev) => !prev);
  };
  const deleteCard=async(id)=>{
    const cardToDelete = data.find((c) => c._id === id);
    if (cardToDelete?.isDefault) return;

    const token = localStorage.getItem("token")
    const confirmDelete = window.confirm("Are you sure you want to delete this card?");
    if (!confirmDelete) return;
    await fetch(`https://flip-app.onrender.com/cards/${id}`,{
     method:"DELETE",
     headers:{"Authorization": `Bearer ${token}`}
    })
    setdata((prev)=>prev.filter((card)=>card._id!==id))
  }

  let content;
  if (data[index % data.length]) {
    if (flip) {
      content = data[index % data.length].answer;
    } else {
      content = data[index % data.length].question;
    }
  } else {
    content = "NO Cards Yet";
  }

  return (
    <>
      <div className="relative w-full h-screen flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-10 cursor-pointer select-none">

        <button
  onClick={indexDecrease}
  className="absolute  mt-100 mr-60 md:relative md:mt-5 md:mr-10"
>

          <svg class="w-[40px] h-[40px] text-purple-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/></svg>
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={data[index % data.length]?._id || "loading"}
            custom={direction}
            onClick={clickhandler}
initial={{ x: direction > 0 ? 150 : -150, y: -10, rotate: direction > 0 ? 8 : -8, scale: 1, opacity: 0 }}
animate={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, transition: { type: "tween", ease: "linear", duration: 0.2 } }}
exit={{ x: direction > 0 ? -150 : 150, y: 20, rotate: direction > 0 ? -8 : 8, scale: 0.95, opacity: 0, transition: { type: "spring", stiffness: 350, damping: 35 } }}









         whileHover={{ scale: 1.01 }}
whileTap={{ scale: 0.99 }}


            style={{ perspective: 1000 }}
            className="w-70 h-110 cursor-pointer mb-30"
          >
            <motion.div
              animate={{ rotateY: flip ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeOut"}}
              style={{
                width: "100%",
                height: "100%",
                transformStyle: "preserve-3d",
                position: "relative",
              }}
              className="border-3 border-violet-400 rounded-lg shadow-md flex items-center justify-center text-center p-4 bg-violet-300 text-neutral-800 relative"
            >
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                {data[index % data.length]?.question || "Loading..."}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteCard(data[index % data.length]?._id);
                  }}
                  className="absolute top-1 right-1 text-violet-600"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5.12817 8.15391C5.12817 10.4103 5.12817 13.5898 5.12817 15.1283C5.23074 16.4616 5.3333 18.2052 5.43587 19.436C5.53843 20.8719 6.7692 22.0001 8.2051 22.0001H15.7948C17.2307 22.0001 18.4615 20.8719 18.5641 19.436C18.6666 18.2052 18.7692 16.4616 18.8718 15.1283C18.9743 13.5898 18.8718 10.4103 18.8718 8.15391H5.12817Z"
                      fill="#030D45"
                    />
                    <path
                      d="M19.1795 5.07698H16.6154L15.7949 3.53852C15.2821 2.61545 14.359 2.00006 13.3333 2.00006H10.8718C9.84615 2.00006 8.82051 2.61545 8.41026 3.53852L7.38462 5.07698H4.82051C4.41026 5.07698 4 5.48724 4 5.8975C4 6.30775 4.41026 6.71801 4.82051 6.71801H19.1795C19.5897 6.71801 20 6.41032 20 5.8975C20 5.38468 19.5897 5.07698 19.1795 5.07698ZM9.12821 5.07698L9.64103 4.25647C9.84615 3.84621 10.2564 3.53852 10.7692 3.53852H13.2308C13.7436 3.53852 14.1538 3.74365 14.359 4.25647L14.8718 5.07698H9.12821Z"
                      fill="#030D45"
                    />
                  </svg>
                </button>
              </div>
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {data[index % data.length]?.answer || "Loading..."}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <button
  onClick={indexIncrease}
  className="absolute mt-97 ml-45 md:relative md:mt-0 md:ml-0"
>

          <svg class="w-[40px] h-[40px] text-purple-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 9 7 7-7 7"/></svg>
        </button>

       <AnimatePresence>
         {renderForm()}
       </AnimatePresence>

        <button onClick={formToggler} className="absolute mt-97 mr-10 md:static md:self-center md:mt-4"><svg className="w-6 h-6 text-purple-800 dark:text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5"/></svg></button>

      </div>
    </>
  );
}




