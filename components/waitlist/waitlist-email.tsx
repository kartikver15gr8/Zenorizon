import * as React from "react";

interface WaitlistEmailProps {
  userEmail: string;
}

export const WaitlistEmail: React.FC<WaitlistEmailProps> = ({ userEmail }) => (
  <div style={{ fontFamily: '"Open Sans", Arial, sans-serif' }}>
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        border: "1px solid #eee",
      }}
    >
      <div
        style={{
          padding: "20px 0",
          textAlign: "center",
          backgroundColor: "#363635",
          borderRadius: "5px 5px 0 0",
          color: "white",
        }}
      >
        <h1 style={{ margin: "0", fontSize: "24px" }}>
          Thanks for Joining Our Waitlist!
        </h1>
      </div>

      <div
        style={{
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "0 0 5px 5px",
        }}
      >
        <p>Hello there,</p>
        <p>
          Thank you for joining our waitlist with{" "}
          <strong>{userEmail.toLowerCase()}</strong>! We&apos;re thrilled to
          have you as part of our Zenorizon community.
        </p>
        <p>
          We&apos;re working hard to launch our product soon and you&apos;ll be
          among the first to know when we&apos;re ready!
        </p>
        <p>
          In the meantime, feel free to follow us on social media for updates:
        </p>

        <div style={{ textAlign: "center", margin: "25px 0" }}>
          <a
            href="https://twitter.com/kartikeystack"
            style={{
              backgroundColor: "#363635",
              color: "white",
              padding: "10px 20px",
              textDecoration: "none",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
          >
            Follow Us
          </a>
        </div>

        <p>If you have any questions, just reply to this email.</p>
        <p>
          Best regards,
          <br />
          The Team
        </p>
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          fontSize: "12px",
          color: "#666",
        }}
      >
        <p>© 2025 Zenorizon. All rights reserved.</p>
        <p>
          You&apos;re receiving this email because you signed up for our
          waitlist.
        </p>
      </div>
    </div>
  </div>
);
