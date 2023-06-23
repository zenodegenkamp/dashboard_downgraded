# README
This repository contains a web application that displays various information on a dashboard-like interface. The application retrieves data from different APIs to show the current weather, cryptocurrency prices, motivational quotes, and a to-do list.

## Features
Background Image: The application uses the Unsplash API to fetch a new background image every 10 seconds. If the API request fails, a default background image is displayed.

## Cryptocurrency Prices: 
The application retrieves the prices of Bitcoin and Ethereum using the CoinGecko API. The prices are updated every 10 seconds. The percentage change in price over the last 24 hours is displayed alongside the current price.

## Weather Information: 
The application uses the OpenWeatherMap API to fetch the current weather for the user's location. The temperature is displayed in Celsius along with an icon representing the weather condition.

## Current Time: 
The application displays the current time and date, which updates every second.

## Motivational Quotes: 
The application fetches random motivational quotes from the Type.fit API and displays them along with the author's name (if available).

## To-Do List: 
The application allows the user to add and remove items from different categories of a to-do list. The to-do items are stored in the browser's local storage, allowing them to persist across sessions. The to-do list can be accessed by clicking on the circle-check icon.

## Usage
To use the application, follow these steps:

Clone the repository or download the source code files.

Open the index.html file in a web browser.

The web application will load and display the dashboard interface.

The background image, cryptocurrency prices, weather information, current time, news articles, motivational quotes, and to-do list will be displayed on the dashboard.

Interact with the different components of the dashboard as follows:

Background Image: The image changes automatically every 10 seconds.
Cryptocurrency Prices: The prices of Bitcoin and Ethereum are displayed, along with the percentage change in price over the last 24 hours. The prices update every 10 seconds.
Weather Information: The current weather for the user's location is displayed.
Current Time: The time and date are updated every second.
Motivational Quotes: A random quote is displayed along with the author's name (if available).
To-Do List: Click on the circle-check icon to access the to-do list. Add and remove items from different categories. The to-do items will be stored in the browser's local storage.
Notes
The web application relies on several external APIs to fetch data. If there are issues with the APIs or the internet connection, some features may not work as expected or display default/fallback content.

The source code is written in JavaScript and utilizes modern web technologies. Ensure that your web browser supports JavaScript and has an internet connection to access the required APIs.

The application does not require any additional dependencies or setup. Simply open the index.html file in a web browser, and it will work as intended.

Feel free to explore the source code and make modifications according to your needs.