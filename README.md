# 🎮 Meme Memory Match - AWS CI/CD Pipeline Project

[![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/)

A memory matching game deployed using AWS CI/CD pipeline, demonstrating automated deployment from GitHub to S3 static website hosting.

## 📖 Project Overview

This project implements a continuous deployment pipeline that automatically deploys a browser-based memory matching game whenever code changes are pushed to the GitHub repository.

### Game Features
- Memory matching gameplay with meme cards
- Responsive design for all devices
- Clean, modern UI with animations
- Single-player mode

## 🏗️ Architecture

![Architecture Diagram](diagram-placeholder.png)

The project utilizes the following AWS services:
- **S3**: Static website hosting
- **AWS CodePipeline**: CI/CD pipeline management
- **GitHub**: Source code repository

## 🚀 Deployment Pipeline

1. Code is pushed to GitHub repository
2. AWS CodePipeline detects the changes
3. Pipeline automatically pulls the latest code
4. Code is deployed to S3 bucket configured for static website hosting

## 🛠️ Setup Instructions

### Prerequisites
- AWS Account with appropriate permissions
- GitHub account
- Basic knowledge of AWS services

### Step-by-Step Deployment

1. **S3 Bucket Setup**
```bash
# Create S3 bucket
aws s3 mb s3://your-bucket-name

# Enable static website hosting
aws s3 website s3://your-bucket-name --index-document index.html
```

2. **Configure S3 Bucket Policy**
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::your-bucket-name/*"
        }
    ]
}
```

3. **Create CodePipeline**
   - Navigate to AWS CodePipeline console
   - Create new pipeline
   - Connect to GitHub repository
   - Configure S3 deployment

## 💰 Cost Considerations

- All services used are eligible for AWS Free Tier
- Minimal costs for S3 storage and requests
- CodePipeline costs after free tier usage

⚠️ **Remember to clean up resources after testing to avoid unnecessary charges**

## 🎮 Game Development

### Current Features
- Card matching mechanics
- Meme-themed cards
- Win condition detection
- Responsive design

### Future Enhancements
- [ ] Scoring system
- [ ] Timer functionality
- [ ] Additional card sets
- [ ] Multiplayer capabilities
- [ ] Leaderboard integration

## 🧹 Resource Cleanup

To avoid unnecessary charges:

1. Delete S3 bucket and contents
```bash
aws s3 rb s3://your-bucket-name --force
```

2. Delete CodePipeline
3. Remove any IAM roles created for the pipeline

## 🔧 Local Development

```bash
# Clone repository
git clone https://github.com/yourusername/your-repo-name.git

# Navigate to project directory
cd your-repo-name

# Open in browser
open index.html
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

---

⭐ Don't forget to star this repository if you found it helpful!

[Back to top](#-meme-memory-match---aws-cicd-pipeline-project)
