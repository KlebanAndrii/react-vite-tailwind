import { useState, useEffect, useRef } from "react";
import defaultAvatar from "../assets/images/default-avatar.png";

const Avatar = () => {
  const [avatar, setAvatar] = useState(() => {
    // Loading the avatar from LocalStorage or using the default value
    return localStorage.getItem("userAvatar") || defaultAvatar;
  });
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newAvatar = reader.result;
        setAvatar(newAvatar);
        localStorage.setItem("userAvatar", newAvatar); // Conservation in LocalStorage
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    setAvatar(defaultAvatar);
    localStorage.removeItem("userAvatar"); // Removal with LocalStorage
    setMenuVisible(false);
  };

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div className="h-8 w-8 rounded-full overflow-hidden cursor-pointer" onClick={toggleMenu}>
        <img src={avatar} alt="User Avatar" className="h-full w-full object-cover" />
      </div>
      <input type="file" id="fileInput" className="hidden" accept="image/*" onChange={handleFileChange} />
      {menuVisible && (
        <div ref={menuRef} className="absolute top-10 left-0 bg-white shadow-lg rounded-md p-2 w-32 z-10">
          <button className="w-full text-left text-red-500 px-2 py-1 hover:bg-gray-300 rounded-md font-bold" onClick={handleDelete}>
            Delete
          </button>
          <button
            className="w-full text-left text-blue-500 px-2 py-1 hover:bg-gray-300 rounded-md font-bold"
            onClick={() => {
              document.getElementById("fileInput").click();
              setMenuVisible(false);
            }}
          >
            Upload
          </button>
        </div>
      )}
    </div>
  );
};

export default Avatar;
