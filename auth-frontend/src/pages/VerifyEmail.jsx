import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/axios";

export default function VerifyEmail() {
  const { token } = useParams();
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await api.get(`/auth/verify-email/${token}`);
        setMessage(res.data.message);
      } catch (err) {
        setMessage(err.response?.data?.message || "Error verifying email");
      }
    };

    verify();
  }, [token]);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}
