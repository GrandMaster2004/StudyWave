exports.courseEnrollmentEmail = (courseName, name) => {
  return `<!DOCTYPE html>
  <html>
  
  <head>
      <meta charset="UTF-8">
      <title>Course Registration Confirmation</title>
      <style>
          body {
              background-color: #ffffff;
              font-family: Arial, sans-serif;
              font-size: 16px;
              line-height: 1.4;
              color: #333333;
              margin: 0;
              padding: 0;
          }
  
  
          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              text-align: center;
          }
  
          .logo {
              max-width: 200px;
              margin-bottom: 20px;
          }
  
          .message {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 20px;
          }
  
          .body {
              font-size: 16px;
              margin-bottom: 20px;
          }
  
          .cta {
              display: inline-block;
              padding: 10px 20px;
              background-color: #FFD60A;
              color: #000000;
              text-decoration: none;
              border-radius: 5px;
              font-size: 16px;
              font-weight: bold;
              margin-top: 20px;
          }
  
          .support {
              font-size: 14px;
              color: #999999;
              margin-top: 20px;
          }
  
          .highlight {
              font-weight: bold;
          }
      </style>
  
  </head>
  
  <body>
      <div class="container">
          <a href="#"><img class="logo" src="https://th.bing.com/th/id/OIP.8TYqXi6fL8iA4hJb14RFJwAAAA?o=7&cb=ucfimg2&rm=3&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3"
                  alt="Techclasses Logo"></a>
          <div class="message">Course Registration Confirmation</div>
          <div class="body">
              <p>Dear ${name},</p>
              <p>You have successfully registered for the course <span class="highlight">"${courseName}"</span>. We
                  are excited to have you as a participant!</p>
              <p>Please log in to your learning dashboard to access the course materials and start your learning journey.
              </p>
              <a class="cta" href="https://techascend-edtech-project.vercel.app/dashboard">Go to Dashboard</a>
          </div>
          <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
                  href="mailto:info@techclasses.com">info@techclasses.com</a>. We are here to help!</div>
      </div>
  </body>
  
  </html>`;
};
