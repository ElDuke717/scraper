import requests
from bs4 import BeautifulSoup

response = requests.get("https://builtin.com/robots.txt")
print(response.text)

# Replace this with the actual URL of the BuiltIn page
url = 'https://builtin.com/companies/location/richmond/type/food-companies'

# Fetch HTML content
response = requests.get(url)
if response.status_code != 200:
    print("Failed to get the webpage.")
    exit()

# Parse HTML
soup = BeautifulSoup(response.text, 'html.parser')

# Find company names
# I'm assuming the HTML structure based on the snippet you provided.
# If it's different, you might have to adjust the code accordingly.
company_name_tags = soup.select('div.company-card-col h2.company-name a')
company_names = [tag.text.strip() for tag in company_name_tags]

# Print out the company names
for name in company_names:
    print(name)

