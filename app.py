from flask import request, render_template
from flask_cors import CORS
from flask import Flask
import requests
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)
CORS(app)

db = SQLAlchemy()

class Watchlist(db.Model):
    address = db.Column('address', db.String(60), primary_key=True)
    token = db.Column(db.String(20))
    blockchain = db.Column(db.String(30))
    amount_transacted = db.Column(db.String(50))
    time = db.Column(db.String(50))
    decimals = db.Column(db.Integer())

    def serialize(self):
        return {
            "address": self.address,
            "token": self.token,
            "blockchain": self.blockchain,
            "amount_transacted": self.amount_transacted,
            "time": self.time,
            "decimals": self.decimals

        }

def jsonify_watchlist(watchlist):
    result = []
    for wallet in watchlist:
        result.append({
            "address": wallet.address,
            "token": wallet.token,
            "blockchain": wallet.blockchain,
            "amount_transacted": wallet.amount_transacted,
            "time": wallet.time,
            "decimals": wallet.decimals
        })
    return result

@app.route('/')
def hello_world():
    return 'Running my first app here in pycharm'

@app.route("/add-wallet-address")
def add_wallet_address():
    watchlist = Watchlist()
    watchlist.address = request.args["address"]
    watchlist.token = request.args["token"]
    watchlist.blockchain = request.args["blockchain"]
    watchlist.amount_transacted = request.args["value"]
    watchlist.time = request.args["time"]
    watchlist.decimals = request.args["decimals"]

    db.session.add(watchlist)
    db.session.commit()
    return jsonify_watchlist(Watchlist.query.all())

@app.route("/remove-wallet-address")
def remove_wallet_address():
    address = request.args["address"]
    Watchlist.query.filter_by(address=address).delete()
    db.session.commit()

    return address


@app.route("/get-wallets")
def get_wallets():
    watchlist_first = Watchlist.query.all()

    # return wallets
    return jsonify_watchlist(watchlist_first)

@app.route("/top-holders")
def get_top_holders():
    chain_id = request.args["chain_id"]
    contract_address = request.args["contract_address"]
    page = request.args["page"]
    limit = request.args["limit"]
    url = f'https://api.chainbase.online/v1/token/top-holders?chain_id={chain_id}&contract_address={contract_address}&page={page}&limit={limit}'
    response = requests.get(url, headers={
          "x-api-key": '2ajP2MBTYZlQA7f6RSXWc6Pk1gU',
          "accept": "application/json",
        })
    return response.json()

if __name__ == "__main__":
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://zan:80U1urckSY4QyIlUQLH0TFO9T1NkqPlJ@dpg-cmskv42cn0vc73bjdvpg-a.frankfurt-postgres.render.com/crypto_watchlist_zcdp'
    app.config["SQLALCHEMY_ECHO"] = True
    app.config["SQLALCHEMY_RECORD_QUERIES"] = True
    db.init_app(app)

    with app.app_context():
        db.drop_all()
        db.create_all()


    app.run()