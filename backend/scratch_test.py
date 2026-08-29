from app.services.ai_structurer import _clean_json

res = _clean_json("Here is the JSON:\n```json\n{\"test\": 123}\n```\nEnjoy!")
print(repr(res))
