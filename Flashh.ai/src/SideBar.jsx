import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SideBar({ onselectSubject }) {
  const [showbar, setShowbar] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState("");
  const [showSubjectInput, SetshowSubjectInput] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleShowbar = () => {
    setShowbar(!showbar);
  };
  const inputHandler = () => {
    SetshowSubjectInput(!showSubjectInput);
  };

  const AddSubject = () => {
    const newSubjectArray = { name: name };
const token = localStorage.getItem("token")
    fetch("http://localhost:3000/subjects", {
      method: "POST",
      headers: { "content-type": "application/json" ,
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(newSubjectArray)
    })
      .then((res) => res.json())
      .then((saved) => {
        if (saved && saved._id) {
          setSubjects((prev) => [...prev, saved]);
          setName("");
          setSelectedSubject(saved._id);
          onselectSubject(saved._id);
        }
      })
      .catch((err) => console.error("Failed to add subject:", err));
  };

 const handleDeleteSubject = async (id) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`http://localhost:3000/subjects/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Delete failed:", data.message || data.error);
      return;
    }

   
    setSubjects((prev) => prev.filter((subj) => subj._id !== id));

    if (selectedSubject === id) {
      const newSelected = subjects.find((s) => s._id !== id)?._id || null;
      setSelectedSubject(newSelected);
      onselectSubject(newSelected);
    }
  } catch (err) {
    console.error("Failed to delete subject", err);
  }
}

  useEffect(() => {
    if (showbar) {
      async function tofetch() {
        const token = localStorage.getItem("token")
        try {
          const response = await fetch("http://localhost:3000/subjects",{
            method:"GET",
            headers:{"Authorization": `Bearer ${token}`}
          });
          const data = await response.json();
          if (Array.isArray(data)) {
            setSubjects(data);
            if (!selectedSubject && data.length > 0) {
              setSelectedSubject(data[0]._id);
              onselectSubject(data[0]._id);
            }
          } else if (data.subjects && Array.isArray(data.subjects)) {
            setSubjects(data.subjects);
            if (!selectedSubject && data.subjects.length > 0) {
              setSelectedSubject(data.subjects[0]._id);
              onselectSubject(data.subjects[0]._id);
            }
          } else {
            setSubjects([]);
          }
        } catch (err) {
          console.error("Failed to fetch subjects:", err);
          setSubjects([]);
        }
      }
      tofetch();
    }
  }, [showbar]);

  return (
    <>
      <button
        onClick={() => { handleShowbar(); }}
        className="p-2 fixed top-[80px] left-2 text-black bg-white rounded shadow-md z-50"
      >
        {showbar ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-[31px] h-[31px]  dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14"/></svg>
        )}
      </button>
      {showbar ? (
        <div className="fixed top-[64px] left-0 h-[calc(100%-64px)] w-60 bg-gray-100 shadow-lg p-4 z-40">
          <div className="flex justify-between items-center mb-3">
            <button onClick={() => { handleShowbar(); }} className="text-gray-300 hover:text-black transition"></button>
            {selectedSubject && (
              <button onClick={() => handleDeleteSubject(selectedSubject)} className="px-3 py-1 text-violet-300 rounded transition">Delete</button>
            )}
          </div>

          <h2 className="text-lg font-semibold mb-4 text-left">Subjects</h2>

          <div className="relative flex flex-wrap gap-3 justify-center items-start mt-2">
            {Array.isArray(subjects) && subjects.length > 0 ? (
              subjects.map((subj) => (
                <motion.div
                  key={subj._id}
                  onClick={() => {
                    onselectSubject(subj._id);
                    setSelectedSubject(subj._id);
                  }}
                  className={`px-4 py-2 font-medium rounded-full shadow-md cursor-pointer select-none ${selectedSubject === subj._id ? "bg-violet-300 text-white" : "bg-violet-200 text-violet-500"}`}
                >
                  {subj.name}
                </motion.div>
              ))
            ) : (
              <p className="text-gray-700 text-sm mb-2">No subjects yet.</p>
            )}
          </div>

          <div className="absolute bottom-4 left-0 w-full flex justify-center">
            <button onClick={() => { inputHandler(); }} className="text-violet-600 rounded-full w-10 h-10 flex items-center justify-center text-xl">+</button>
          </div>

          {showSubjectInput ? (
            <div>
              <input type="text" placeholder="New Subject" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 mb-2 border-violet-400" />
              <button onClick={() => { AddSubject(); inputHandler(); }} className="w-full bg-violet-600 text-white py-2 rounded">Done Creating</button>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}


