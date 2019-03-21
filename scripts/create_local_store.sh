FILEPATH='./src/lib/ApiBackup.json'
BUNDLE_URL='https://pca.techequipt.com.au/api/bundle/'
touch $FILEPATH
curl -H "Content-Type: application/json" $BUNDLE_URL -o $FILEPATH
