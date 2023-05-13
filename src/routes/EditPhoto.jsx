import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPhoto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const editPhoto = (e) => {
    try {
			const photo = {
				imageUrl,
				captions,
				updatedAt: new Date().toDateString(),
			};
			fetch(`http://localhost:3001/photos/${id}`, {
				method: "PATCH",
				body: JSON.stringify(photo),
				headers: {
					"Content-Type": "application/json",
				},
			});
			// const data = add.json();
      e.preventDefault();
			navigate("/photos");
		} catch (err) {
			setError(err)
		}
  };

  const fetchData = async (id) => {
		try {
			const response = await fetch(`http://localhost:3001/photos/${id}`);
			const data = await response.json();
			setImageUrl(data.imageUrl);
		  setCaptions(data.captions);
		} catch (err) {
			setError(err);
		}
		setLoading(false);
	};

  useEffect(() => {
    setLoading(true);
    fetchData(id)
  }, [id]);

  if (error) return <div>Error!</div>;

  return (
    <>
      {loading ? (
        <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
          Loading...
        </h1>
      ) : (
        <div className="container">
          <form className="edit-form" onSubmit={editPhoto}>
            <label>
              Image Url:
              <input
                className="edit-input"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
            <label>
              Captions:
              <input
                className="edit-input"
                type="text"
                value={captions}
                data-testid="captions"
                onChange={(e) => setCaptions(e.target.value)}
              />
            </label>
            <input className="submit-btn" type="submit" value="Submit" data-testid="submit" />
          </form>
        </div>
      )}
    </>
  );
};

export default EditPhoto;
