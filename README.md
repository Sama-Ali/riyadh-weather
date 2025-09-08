# 🌤️ Weather App

A beautiful weather application built with React, featuring real-time weather data, bilingual support (Arabic/English), and RTL/LTR text direction switching.

## ✨ Features

- 🌍 **Real-time Weather Data** - Current weather conditions from OpenWeatherMap API
- 🌐 **Arabic and English language toggle**
- 📱 **RTL/LTR Support** - Automatic text direction switching
- 🎨 **Modern UI** - Material-UI components with responsive design
- 📅 **Localized Dates** - Date formatting in both Arabic and English

## 🛠️ Technologies Used

- **React 18** - Frontend framework
- **Material-UI** - UI component library
- **i18next** - Internationalization
- **Moment.js** - Date formatting and localization
- **Axios** - HTTP client for API requests
- **OpenWeatherMap API** - Weather data source

## 📦 Installation

1. **Clone the repository**

2. **Install dependencies**

3. **Get API Key**

   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - Get your free API key
   - Replace the API key in `src/TheCard.js` (line 45)

4. **Open your browser**

## 🌐 Internationalization

The app supports two languages:

### Arabic (العربية)

- RTL text direction
- Arabic month names
- Right-aligned text

### English

- LTR text direction
- English month names
- Left-aligned text

### Adding New Languages

1. Create new translation files in `public/locales/[language]/translation.json`
2. Update `src/i18n.js` configuration
3. Add language toggle logic in `src/TheCard.js`

## 📁 Project Structure

```
weather-app/
├── public/
│   ├── locales/
│   │   └── ar/
│   │       └── translation.json
│   └── index.html
├── src/
│   ├── components/
│   │   └── TheCard.js          # Main weather component
│   ├── styles/
│   │   └── style.css           # Custom styles
│   ├── i18n.js                 # Internationalization config
│   ├── App.js                  # Main app component
│   └── index.js                # App entry point
├── package.json
└── README.md
```

### Styling

- Modify `src/style.css` for custom styles
- Update Material-UI theme in `src/App.js`
- Adjust RTL/LTR styles as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for weather data API
- [Material-UI](https://mui.com/) for beautiful UI components
- [i18next](https://www.i18next.com/) for internationalization
- [Moment.js](https://momentjs.com/) for date formatting

## 📞 Contact

Sama - samaali2h@gmail.com@example.com

Project Link: [https://github.com/Sama-Ali/riyadh-weather]

---

⭐ Don't forget to give this project a star if you found it helpful!
