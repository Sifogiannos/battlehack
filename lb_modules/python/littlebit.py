import urllib, urllib2

class LittleBit:
    def __init__(self, api_key):
        self.api_key = api_key

    def donate(self, amount):
        url = 'http://localhost/donations'
        data = urllib.urlencode({
            "api_key": self.api_key,
            "amount": amount
        })
        req = urllib2.Request(url, data)
        rsp = urllib2.urlopen(req)
        return rsp.read()

