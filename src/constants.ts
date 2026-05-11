export const CONTACT = {
  whatsappNumber: "919458180097",
  phoneNumber: "+919458180097",
  displayPhone: "+91 94581 80097",
  email: "hello@jaihotelmandal.com",
  displayEmail: "hello@jaihotelmandal.com",
  address: "Mandal Village, route to Chopta, Chamoli District, Uttarakhand",
  directionsUrl:
    "https://www.google.com/maps/search/?api=1&query=Jai%20Hotel%20Mandal%20Chamoli%20Uttarakhand",
  instagramUrl: "https://www.instagram.com/",
  facebookUrl: "https://www.facebook.com/",
  youtubeUrl: "https://www.youtube.com/"
};

export const WHATSAPP_NUMBER = CONTACT.whatsappNumber;
export const PHONE_NUMBER = CONTACT.phoneNumber;

export function createWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
