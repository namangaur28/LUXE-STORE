const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || '';
const TO_EMAIL = 'gaurnaman800@gmail.com';

const sendEmail = async (subject, message) => {
  if (!ACCESS_KEY) return;
  try {
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject,
        from_name: 'LuxeStore Notification',
        to: TO_EMAIL,
        message,
      }),
    });
  } catch (error) {
    console.error('Email notification failed:', error);
  }
};

export const sendLoginEmail = async (userName, userEmail, action) => {
  await sendEmail(`LuxeStore — New ${action}`, [
    `A user just ${action === 'signup' ? 'signed up' : 'logged in'}.`,
    '',
    `Name:  ${userName}`,
    `Email: ${userEmail}`,
    `Time:  ${new Date().toLocaleString()}`,
  ].join('\n'));
};

export const sendOrderEmail = async (order) => {
  const itemsList = order.items
    .map(item => `  • ${item.title} (x${item.quantity}) — $${(item.price * item.quantity).toFixed(2)}`)
    .join('\n');

  await sendEmail(`LuxeStore — New Order #${order.id}`, [
    `New order placed!`,
    '',
    `Order ID: ${order.id}`,
    `Date: ${new Date(order.date).toLocaleString()}`,
    '',
    `Items:`,
    itemsList,
    '',
    `Total: $${order.total.toFixed(2)}`,
    '',
    `Shipping To:`,
    `  Name:  ${order.shipping.fullName}`,
    `  Email: ${order.shipping.email}`,
    `  Address: ${order.shipping.address}, ${order.shipping.city} ${order.shipping.zipCode}`,
  ].join('\n'));
};
