// src/api/contact.ts

export interface ContactPayload {
  fullName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  lookingFor: "Buy" | "Rent" | "Sell";
  propertyType: "Apartment" | "House" | "Villa" | "Commercial";
  bestTimeToContact?: string;
  preferredContactMethod: "Phone" | "WhatsApp" | "Email";
  message?: string;
}

// Base URL (change if deployed)
const BASE_URL = "http://localhost:8000/api/contact";

// ➤ Submit Contact Form
export const createContact = async (data: ContactPayload) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Something went wrong");
    }

    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// ➤ Get All Contacts (Admin)
export const getContacts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/contacts`);

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};