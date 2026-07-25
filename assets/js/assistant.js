/* Maharaja Readymade — Royal Assistant chat
   Part of the site's plain-JavaScript bundle; no build step, no dependencies. */

var chatResponses = [
  { keys: ['timing','time','open','close','hour','monday'], text: "Our store is open All Days: 10:00 AM — 9:30 PM.\n\nMONDAY SPECIAL NOTE: Timings may differ on Mondays. Before visiting on Monday, please confirm shop opening by calling +91 94104 34644 (Nitesh Goyal)." },
  { keys: ['location','address','where','place','find','reach','ansari','bulandshahr'], text: "Maharaja Readymade is located at:\nAnsari Road, Bulandshahr, Uttar Pradesh — 203001\n\nWe are easily accessible in the main market area of Bulandshahr city." },
  { keys: ['kids','children','boy','girl'], text: "Our Kids Wear collection ranges from Rs. 499 to Rs. 5,499.\n\nWe offer ethnic wear, casuals, party dresses, school uniforms, and everyday comfort clothing for boys and girls of all ages." },
  { keys: ['ladies','women','woman','saree','suit','kurti','female'], text: "Our Ladies Wear collection ranges from Rs. 699 to Rs. 17,899.\n\nWe have elegant sarees, suits, kurtis, western wear, party dresses, and everyday fashion for the modern woman." },
  { keys: ['mens','men','man','male','shirt','trouser','suit','formal','casual'], text: "Our Mens Wear collection ranges from Rs. 799 to Rs. 11,999.\n\nWe offer formal suits, casual shirts, jeans, ethnic wear, jackets, and premium brand collections for every occasion." },
  { keys: ['bridal','wedding','lehenga','sherwani','ethnic','marriage'], text: "Our Bridal & Ethnic collection ranges from Rs. 1,399 to Rs. 36,999.\n\nWe have stunning bridal lehengas, groom sherwanis, sarees, and ethnic ensembles for weddings, festivals, and celebrations." },
  { keys: ['accessories','belt','wallet','perfume','sock','cap','watch','spectacle','handkerchief','towel'], text: "Our Accessories collection ranges from Rs. 59 to Rs. 2,599.\n\nItems include: Towels, Handkerchiefs, Belts, Perfumes, Socks, Wallets, Caps, Kids Watches, and Spectacles." },
  { keys: ['brand','polo','monte carlo','parx','park avenue','killer','mufti','jockey','sweet dreams','hampsted','twills','oxemberg','van heusen'], text: "We carry 12 premium brands:\n\n1. U.S. Polo Assn.\n2. Monte Carlo\n3. Parx\n4. Park Avenue\n5. Killer\n6. Mufti\n7. Jockey\n8. Sweet Dreams\n9. J. Hampsted\n10. Twills\n11. Oxemberg by Siyaram's\n12. Van Heusen" },
  { keys: ['nitesh','owner','94104'], text: "Nitesh Goyal is the Owner and Primary Contact of Maharaja Readymade.\n\nPhone: +91 94104 34644\nEmail: maharaja203001@gmail.com" },
  { keys: ['rajeev','97563'], text: "Rajeev Goyal is a Co-owner of Maharaja Readymade.\n\nPhone: +91 97563 38999" },
  { keys: ['ravinder','99972'], text: "Ravinder Goyal is a Co-owner of Maharaja Readymade.\n\nPhone: +91 99972 60974" },
  { keys: ['email','mail'], text: "Our email address is:\nmaharaja203001@gmail.com" },
  { keys: ['whatsapp','message','chat'], text: "You can reach us on WhatsApp Business at +91 94104 34644.\n\nClick the WhatsApp buttons on our website to start a conversation directly!" },
  { keys: ['instagram','social','follow'], text: "Follow us on Instagram:\n@maharajareadymade_bsr\n\nStay updated with our latest collections, offers, and store updates!" },
  { keys: ['exchange','return','policy'], text: "We have a customer-friendly exchange policy.\n\nPlease visit the store with your bill within the exchange period. Our staff will be happy to assist you with size exchanges and other queries." },
  { keys: ['alteration','tailor','stitch','fitting','size'], text: "We offer expert alteration and customization services to ensure the perfect fit.\n\nOur in-house tailoring team can adjust garments to your measurements. Alteration services are available for most items purchased from our store." },
  { keys: ['payment','pay','cash','card','upi','online'], text: "We accept multiple payment methods:\n\n- Cash\n- Debit/Credit Cards\n- UPI (Google Pay, PhonePe, Paytm, etc.)\n- Net Banking" },
  { keys: ['parking','vehicle','car','bike'], text: "Parking is available near our store on Ansari Road.\n\nAs we are located in the main market area, you can find parking space nearby. We recommend visiting during non-peak hours for easier parking." },
  { keys: ['bulk','school','uniform','corporate','order','wholesale'], text: "We accept bulk orders for school uniforms, corporate requirements, and wedding parties.\n\nPlease contact Nitesh Goyal at +91 94104 34644 to discuss bulk pricing and customization options." },
  { keys: ['wedding','package','marriage','shaadi'], text: "We offer complete wedding packages including bridal lehengas, groom sherwanis, and outfits for the entire family.\n\nVisit our Bridal & Ethnic section or contact us on WhatsApp for personalized wedding shopping assistance." },
  { keys: ['customization','custom','personalize','design'], text: "We offer customization services for select garments.\n\nFrom embroidery to specific measurements, our team can help personalize your outfit. Please visit the store or contact us to discuss your requirements." },
  { keys: ['festival','diwali','eid','holi','rakhi','navratri'], text: "We launch special festive collections for Diwali, Eid, Holi, Raksha Bandhan, Navratri, and other celebrations.\n\nFollow us on Instagram @maharajareadymade_bsr for updates on new festive arrivals!" },
  { keys: ['new','arrival','latest','collection','trend'], text: "We update our collections regularly with the latest fashion trends.\n\nNew arrivals are added every season. Visit our store or follow us on Instagram @maharajareadymade_bsr to see what's new!" },
  { keys: ['size','chart','measurement','fit'], text: "We stock all standard sizes from XS to XXL and beyond in most categories.\n\nOur staff will help you find the perfect fit. For bridal and ethnic wear, we also offer customization services." },
  { keys: ['history','since','1992','started','begin'], text: "Maharaja Readymade was established in 1992 on Ansari Road, Bulandshahr.\n\nWhat started as a modest store has grown into a 5-level, 10,000 sq ft fashion destination serving 500,000+ happy families and still continuing." },
  { keys: ['about','who','store','shop','maharaja'], text: "Maharaja Readymade is the Royal Address of Fashion in Bulandshahr.\n\nEstablished in 1992, we are a 10,000 sq ft multi-brand fashion store across 5 grand levels, offering premium clothing for men, women, and children." },
  { keys: ['level','floor','size','sq ft','space'], text: "Our store spans 10,000 square feet across 5 grand levels:\n\n- Ground Floor: Mens Wear & Accessories\n- First Floor: Ladies Wear\n- Second Floor: Kids Wear\n- Third Floor: Bridal & Ethnic\n- Fourth Floor: Premium Brands & Alterations" },
  { keys: ['family','customer','happy'], text: "We are proud to have served 500,000+ happy families over 34+ years, and still continuing!\n\nOur customers come from Bulandshahr, Khurja, Aligarh, Sikandrabad, Greater Noida, and beyond." },
  { keys: ['offer','discount','sale','deal','price drop'], text: "We run seasonal sales and festive offers throughout the year.\n\nFollow us on Instagram @maharajareadymade_bsr or contact us on WhatsApp for current offers and promotions." },
  { keys: ['contact','phone','number','call'], text: "You can reach us at:\n\nNitesh Goyal (Owner): +91 94104 34644\nRajeev Goyal: +91 97563 38999\nRavinder Goyal: +91 99972 60974\n\nEmail: maharaja203001@gmail.com\nWhatsApp: +91 94104 34644" },
  { keys: ['price','range','cost','rate','cheap','expensive'], text: "Our price ranges are:\n\nKids Wear: Rs. 499 — Rs. 5,499\nLadies Wear: Rs. 699 — Rs. 17,899\nMens Wear: Rs. 799 — Rs. 11,999\nBridal & Ethnic: Rs. 1,399 — Rs. 36,999\nAccessories: Rs. 59 — Rs. 2,599" },
  { keys: ['hi','hello','hey','namaste','hola'], text: "Namaste! Welcome to Maharaja Readymade — The Royal Address of Fashion.\n\nHow may I assist you today? You can ask about our store timings, location, brands, price range, or anything else!" }
];

var fallbackResponse = "I am sorry, I could not find an answer to that. Please contact Nitesh Goyal directly at +91 94104 34644 or WhatsApp us for immediate assistance.";

function findResponse(input) {
  var lower = input.toLowerCase();
  for (var i = 0; i < chatResponses.length; i++) {
    var item = chatResponses[i];
    for (var j = 0; j < item.keys.length; j++) {
      if (lower.indexOf(item.keys[j]) !== -1) return item.text;
    }
  }
  return fallbackResponse;
}

/* CHAT FUNCTIONS */
function sendChat() {
  var input = document.getElementById('chat-input');
  var msg = input.value.trim();
  if (!msg) return;
  addMessage('chat-messages', msg, 'user');
  input.value = '';
  setTimeout(function() {
    addMessage('chat-messages', findResponse(msg), 'bot');
    scrollChat('chat-messages');
  }, 800);
}
function sendQuick(topic) {
  var quickMap = { timings: 'What are your store timings?', location: 'Where is your store located?', price: 'What is your price range?', brands: 'Which brands do you carry?', contact: 'How can I contact you?', offers: 'Do you have any offers?' };
  addMessage('chat-messages', quickMap[topic], 'user');
  setTimeout(function() {
    addMessage('chat-messages', findResponse(quickMap[topic]), 'bot');
    scrollChat('chat-messages');
  }, 800);
}
function handleChatKey(e) { if (e.key === 'Enter') sendChat(); }

/* FLOATING CHAT */
function toggleFloatingChat() {
  document.getElementById('floating-chat-panel').classList.toggle('open');
}
function sendFloatingChat() {
  var input = document.getElementById('floating-chat-input');
  var msg = input.value.trim();
  if (!msg) return;
  addMessage('floating-chat-messages', msg, 'user');
  input.value = '';
  setTimeout(function() {
    addMessage('floating-chat-messages', findResponse(msg), 'bot');
    scrollChat('floating-chat-messages');
  }, 800);
}
function sendFloatingQuick(topic) {
  var quickMap = { timings: 'What are your store timings?', location: 'Where is your store located?', price: 'What is your price range?', brands: 'Which brands do you carry?', contact: 'How can I contact you?' };
  addMessage('floating-chat-messages', quickMap[topic], 'user');
  setTimeout(function() {
    addMessage('floating-chat-messages', findResponse(quickMap[topic]), 'bot');
    scrollChat('floating-chat-messages');
  }, 800);
}
function handleFloatingKey(e) { if (e.key === 'Enter') sendFloatingChat(); }

function addMessage(containerId, text, type) {
  var container = document.getElementById(containerId);
  var div = document.createElement('div');
  div.className = 'chat-message ' + type;
  div.textContent = text;
  container.appendChild(div);
  scrollChat(containerId);
}
function scrollChat(containerId) {
  var container = document.getElementById(containerId);
  container.scrollTop = container.scrollHeight;
}
