# EmojiPastaBot

EmojiPastaBot is a scraper/server/client that takes the top 1000 posts from the r/emojipasta subreddit and analysis them to match words to the most popular emojis 

See it in action at http://emojipasta.co

It currently only matches single following emojis to words but I'd love to add more features such as multiple emoji detection to the scraper and the ability to override emojis etc to the website

## Installation

Requires node version 7.x 

The Scraper and the Server folders need `npm install` ran on them, then simply `node 'nameofjsfile.js'`

## Usage

Generate an emojiDB.json file with the scraper then it should automatically be put in the Server directory, run the server to allow the client to process new enojipastas

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## TODO

- Multi-Emojis matching to words
- Overriding option on the Client
- Grab all the new posts of the day procces them and add them to the db instead of refreshing off top 1000 (maybe)
- (I'm sure theres a lot more)

## License

MIT License (see License.md)