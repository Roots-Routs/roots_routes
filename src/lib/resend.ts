const BASE_URL = import.meta.env.VITE_SUPABASE_URL;

export const sendEmail = async (email: string, subject: string, html: any) => {
  const response = await fetch(
    `${BASE_URL}/functions/v1/resend-email`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: email, subject, html })
    }
  );
  return response.json();
};