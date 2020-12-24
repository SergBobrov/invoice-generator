curl -v \
  -X POST \
  -d '{"email":"naik-92@inbox.ru","description":[{"title":"test-curl","price":"1000"}]}' \
  -H 'Content-type: application/json' \
  http://localhost:5000/api/invoice
