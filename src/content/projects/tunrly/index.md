---
title: Tunrly
description: A comprehensive full-stack music streaming PWA built with Angular and Node.js, featuring intelligent API integration with LastFM and Musicbrainz, YouTube audio sourcing, MongoDB caching, and user personalization features. This graduation project demonstrated advanced web development skills while challenging traditional music streaming models through an ad-free, cost-free approach.
cover: 
  src: '@/content/projects/tunrly/cover.png'
  alt: 'Tunrly music app'
repo: tunrly-pwa
tags: [Angular, Node JS, MongoDB, Express, Mongoose, Bootstrap, PWA]
draft: false
published: 02/22/2022
---

## Tunrly, the only free music streaming app without ads

Tunrly was born as my graduation project for my web development studies, representing a comprehensive full-stack application that challenged the traditional music streaming model. The project aimed to provide users with unlimited access to music without the typical barriers of subscription fees or intrusive advertisements.

### Technical Architecture

The application was built using a modern, scalable architecture consisting of two main components:

**Backend API (Node.js/Express)**
- RESTful API designed with Express.js framework
- MongoDB database with Mongoose ODM for data modeling and validation
- Integration with multiple external APIs for comprehensive music data
- Intelligent caching system to optimize performance and reduce API rate limits
- Secure user authentication and session management

**Frontend PWA (Angular)**
- Progressive Web App built with Angular framework
- Responsive design using Bootstrap for cross-device compatibility
- Offline capabilities and app-like experience on mobile devices
- Real-time music streaming with seamless playback controls

### Data Integration & Caching Strategy

The API leveraged a sophisticated multi-source approach to music data:

- **LastFM API**: Provided comprehensive artist information, album details, and user listening statistics
- **Musicbrainz API**: Supplied detailed metadata including release information, track listings, and artist relationships
- **YouTube Integration**: Utilized web scraping techniques to source actual audio content
- **MongoDB Caching**: Implemented intelligent caching to store frequently accessed data, reducing external API calls and improving response times

### User Experience Features

The client application offered a rich, user-centric experience:

- **User Authentication**: Secure account creation and login system
- **Music Discovery**: Advanced search functionality across artists, albums, and songs
- **Personalization**: Favorites system allowing users to save preferred tracks
- **Playlist Management**: Create, edit, and organize custom playlists
- **Seamless Playback**: High-quality audio streaming with intuitive controls
- **Cross-Platform Access**: Consistent experience across desktop and mobile devices

### Project Impact & Challenges

Tunrly successfully demonstrated the viability of ad-free music streaming through innovative technical solutions. The application handled thousands of music requests efficiently, with the caching system proving particularly effective in managing API rate limits and ensuring smooth user experience.

However, the project faced significant challenges that ultimately led to its temporary discontinuation:

- **Limited User Adoption**: Despite technical success, the app struggled to gain significant user traction
- **Infrastructure Costs**: Heroku's removal of free-tier dynos eliminated the cost-effective hosting solution
- **Legal Considerations**: The web scraping approach, while technically feasible, raised questions about long-term sustainability

### Technical Achievements

The project showcased several advanced web development concepts:
- Full-stack JavaScript development with modern frameworks
- API integration and data aggregation from multiple sources
- Progressive Web App implementation with offline capabilities
- Database design and optimization for high-performance caching
- Responsive design principles and cross-platform compatibility

Tunrly remains a testament to the potential of innovative web technologies in creating meaningful user experiences, even as it highlighted the complex challenges of building sustainable music streaming platforms in today's digital landscape.