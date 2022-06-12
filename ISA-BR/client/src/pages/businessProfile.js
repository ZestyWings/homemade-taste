import { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../util/auth";
import ContactForm from "../components/ContactForm";

export default function Contact() {
  return (
    <div>
      <ContactForm></ContactForm>
    </div>
  );
}
