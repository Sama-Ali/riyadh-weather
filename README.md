# 🌤️ Weather App

A beautiful weather application built with React, featuring real-time weather data, bilingual support (Arabic/English), and RTL/LTR text direction switching.

## ✨ Features

- 🌍 **Real-time Weather Data** - Current weather conditions from OpenWeatherMap API
- 🔄 **Async State Management** - Redux Toolkit with async thunks for weather data fetching

- 🌐 **Arabic and English language toggle**
- 📱 **RTL/LTR Support** - Automatic text direction switching
- 🎨 **Modern UI** - Material-UI components with responsive design
- 📅 **Localized Dates** - Date formatting in both Arabic and English

## 🛠️ Technologies Used

- **React 18** - Frontend framework
- **Redux Toolkit** - State management with async thunks
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
   - Replace the API key in `src/features/logics/weatherSlice.js` (line 8)

4. **Start the development server**

   ```bash
   npm start
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

## 🔄 Redux Async State Management

This app uses Redux Toolkit for state management with async thunks:

### Weather Slice Features

- **`fetchWeather`** - Async thunk that fetches weather data from OpenWeatherMap API
- **Loading States** - `isLoading` state for UI feedback during API calls
- **Error Handling** - Proper error states for failed requests
- **Weather Data** - Stores current weather information in Redux state

### State Structure

```javascript
{
  weather: {
    value: "the value",
    isLoading: false,
    weather: {
      city: "City Name",
      temp: 25,
      description: "Clear sky",
      icon: "weather-icon-url",
      min: 20,
      max: 30
    }
  }
}
```

### Usage in Components

```javascript
// Dispatch async action
dispatch(fetchWeather());

// Access state
const weather = useSelector((state) => state.weather.weather);
const isLoading = useSelector((state) => state.weather.isLoading);
```

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
│   ├── app/
│   │   └── store.js            # Redux store configuration
│   ├── features/
│   │   └── logics/
│   │       └── weatherSlice.js # Redux slice with async thunks
│   ├── TheCard.js              # Main weather component
│   ├── style.css               # Custom styles
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
