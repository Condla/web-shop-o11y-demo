from flask import Flask
import requests
app = Flask(__name__)

product_categories = ["Videogames", "Phones", "Books"]
#cities = {"Salzburg": "AT"}
@app.route('/metrics')
def get_the_rain():
  metrics_string = ""
  for city in cities:
    request_string = 'http://api.openweathermap.org/data/2.5/weather?q='+ city +'&appid=cea13709bbae3a00ae819819e4363ea8'
    weather_response =requests.get(request_string)
    try:
      city_rain_ml = weather_response.json()['rain']['1h']
    except KeyError:
      city_rain_ml = 0
    metrics_string += "rain_" + city.lower() + '_ml_per_hour{location="' + city.lower() + '"} ' + str(city_rain_ml) + '\n'
  return metrics_string


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0',port=6666)

    requests.get(request_string)
