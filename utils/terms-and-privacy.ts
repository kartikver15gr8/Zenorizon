// Terms of Service Options

export const TermsOptions: {
  title: string;
  subTitle: string;
  points: string[];
}[] = [
  {
    title: "User Responsibility",
    subTitle: "User agree to:",
    points: [
      "Comply with all applicable laws and regulations",
      "Maintain the security of their instance",
      "Not use the service for spam or malicious purposes",
      "Respect intellectual property rights",
      "Report security vulnerabilities responsibly",
    ],
  },
  {
    title: "Self-Hosted Service",
    subTitle: "",
    points: [
      "Zenorizon provides software that users can deploy on their own infrastructure",
      "Users are responsible for their own hosting, maintenance, and compliance",
      "The software is provided 'as is' under the Apache 2.0 License",
    ],
  },
  {
    title: "Software License",
    subTitle: "Zenorizon is licensed under the Apache 2.0 License:",
    points: [
      "Users are free to use, modify, and distribute the software",
      "The software is provided “as-is” without warranties or guarantees of any kind",
      "Users must retain the original copyright and license notice",
      "Contributions and modifications may also be subject to the Apache 2.0 License",
      "The license includes a grant of patent rights from contributors to users",
    ],
  },
  {
    title: "Community Guidelines",
    subTitle: "Users participating in our community agree to:",
    points: [
      "Follow our code of conduct",
      "Contribute constructively to discussions",
      "Respect other community members",
      "Report inappropriate behavior",
    ],
  },
];

// Privacy Policy Options

export const PrivacyOptions: {
  title: string;
  subTitle: string;
  points: string[];
}[] = [
  {
    title: "We are Transparent",
    subTitle: "Our verified privacy commitments:",
    points: [
      "We store user emails after encryption to manage user authenticity",
      "Client-Side Processing: All email processing happens in your browser",
      "Open Source: Our entire codebase is public and can be audited",
      "Minimal Data: We only request essential Gmail API permissions",
      "User Control: You can revoke our access to your Gmail at any time",
    ],
  },
  {
    title: "Auth Integration",
    subTitle: "User can Oauth using GitHub or Google",
    points: [
      "We request access to your Gmail data only after receiving your explicit consent",
      "If user is authenticating via GitHub, we only request access for their associated email and avatar",
      "Your Google account credentials are never stored on our servers",
      "We use secure OAuth 2.0 authentication provided by Google",
      "You can revoke our access to your Google account at any time through your Google Account settings and same goes with GitHub",
    ],
  },
  {
    title: "Self-Hosted Instances",
    subTitle: "",
    points: [
      "When you self-host Zenorizon, your email data remains entirely under your control",
      "No data is sent to our servers or third parties without your explicit consent",
      "You maintain complete ownership and responsibility for your data",
      "We provide detailed documentation on secure self-hosting practices",
      "You can configure your own data retention and backup policies",
    ],
  },
  {
    title: "Data Sharing and Transfer",
    subTitle: "",
    points: [
      "Google user data is never shared with third parties except as required for core service functionality",
      "When necessary, we only work with service providers who comply with Google API Services User Data Policy",
      "All service providers are bound by strict confidentiality agreements",
      "We maintain a current list of all third-party service providers with access to Google user data",
      "Data sharing agreements are reviewed annually",
      "Users are notified of any material changes to our data sharing practices",
    ],
  },
  {
    title: "Security Response",
    subTitle: "We continuously maintain and improvise the security checks",
    points: [
      "Dedicated security monitoring to detect and respond to threats in real-time",
      "Well-defined escalation process for handling security incidents efficiently",
      "Ongoing internal security education and best practices for all developers and staff",
    ],
  },
];
