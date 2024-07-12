from nltk import ngrams
import requests
from bs4 import BeautifulSoup
import pandas as pd
import nltk
from collections import Counter
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.decomposition import LatentDirichletAllocation

# Download necessary NLTK data
# nltk.download('punkt')
# nltk.download('stopwords')

url = 'https://www.vogue.com/fashion/trends'
response = requests.get(url)
response.raise_for_status()

soup = BeautifulSoup(response.content, 'html.parser')
headlines = soup.find_all('h3')
headline_text = [i.get_text(strip=True) for i in headlines]

df = pd.DataFrame(headline_text, columns=['Headline'])

df['Headline'] = df['Headline'].str.lower()
df['Headline'] = df['Headline'].str.replace(r'[^a-zA-Z\s]', '', regex=True)

df['headline_tokens'] = df['Headline'].apply(word_tokenize)

standard_stop_words = set(stopwords.words('english'))
fashion_stop_words = set([
    'fashion', 'style', 'wear', 'trend', 'collection', 'look', 'new', 'season',
    'designer', 'runway', 'show', 'week', 'model', 'models', 'fashionista',
    'clothing', 'outfit', 'outfits', 'piece', 'pieces', 'line', 'lines', 'store',
    'stores', 'shop', 'shops', 'shopping', 'brand', 'brands', 'sale', 'sales',
    'buy', 'bought', 'purchase', 'purchases', 'latest', 'fall', 'spring',
    'summer', 'winter', 'online', 'market', 'markets', 'marketplace', 'fashionable',
    'wearable', 'accessory', 'accessories'
])
fashion_verbs = set([
    'wear', 'wears', 'worn', 'dressed', 'dress', 'style', 'styled', 'styles', 'look', 'looks',
    'seen', 'feature', 'features', 'featuring', 'showcase', 'showcases', 'showcasing',
    'launch', 'launches', 'launched', 'design', 'designs', 'designed', 'create', 'creates',
    'created', 'collaborate', 'collaborates', 'collaborated', 'inspire', 'inspires',
    'inspired', 'model', 'models', 'modeled', 'tailor', 'tailors', 'tailored', 'fit',
    'fits', 'fitted', 'adorn', 'adorns', 'adorned', 'embellish', 'embellishes', 'embellished',
    'decorate', 'decorates', 'decorated', 'trim', 'trims', 'trimmed', 'accessorize',
    'accessorizes', 'accessorized', 'match', 'matches', 'matched', 'coordinate',
    'coordinates', 'coordinated', 'pair', 'pairs', 'paired',
    'customize', 'customizes', 'customized', 'personalize', 'personalizes', 'personalized',
    'alter', 'alters', 'altered', 'revamp', 'revamps', 'revamped', 'rework', 'reworks',
    'reworked', 'restyle', 'restyles', 'restyled', 'show', 'shows', 'showed', 'pose',
    'poses', 'posed', 'walk', 'walks', 'walked', 'present', 'presents', 'presented',
    'unveil', 'unveils', 'unveiled', 'fabricate',
    'fabricates', 'fabricated', 'assemble', 'assembles', 'assembled', 'construct',
    'constructs', 'constructed', 'fashion', 'fashions', 'fashioned', 'cut', 'cuts',
    'cutting', 'stitched'
])

shopping_retail_terms = set([
    'buy', 'bought', 'purchase', 'purchases', 'shop', 'shops', 'shopping',
    'store', 'stores', 'retail', 'sale', 'sales', 'discount', 'discounts',
    'offer', 'offers', 'price', 'prices', 'affordable', 'cheap', 'expensive',
    'deal', 'deals', 'bargain', 'bargains', 'market', 'markets', 'marketplace',
    'mall', 'malls', 'outlet', 'outlets', 'boutique', 'boutiques', 'vendor',
    'vendors', 'merchant', 'merchants', 'trade', 'trades', 'trading', 'clearance',
    'inventory', 'stock', 'stocks', 'restock', 'restocks', 'restocked', 'availability',
    'available', 'unavailable', 'delivery', 'deliveries', 'ship', 'ships', 'shipping',
    'shipped', 'return', 'returns', 'returned', 'refund', 'refunds', 'refunded',
    'exchange', 'exchanges', 'exchanged', 'policy', 'policies', 'checkout',
    'checkout', 'cart', 'carts', 'basket', 'baskets', 'coupon', 'coupons',
    'voucher', 'vouchers', 'membership', 'memberships', 'subscription', 'subscriptions',
    'subscribe', 'subscribes', 'subscribed', 'service', 'services', 'customer',
    'customers', 'client', 'clients', 'online', 'offline', 'website', 'websites',
    'ecommerce', 'payment', 'payments', 'credit', 'debit', 'cash', 'order',
    'orders', 'ordered', 'preorder', 'preorders', 'preordered', 'in-store', 'retailer',
    'retailers', 'shopper', 'shoppers', 'consumer', 'consumers', 'transaction',
    'transactions', 'receipt', 'receipts', 'checkout', 'deliver', 'delivers',
    'delivered', 'unbox', 'unboxes', 'unboxed', 'showroom', 'showrooms', 'browse',
    'browses', 'browsing', 'window', 'window-shop', 'window-shopping', 'window-shops'
])
fashion_events_seasons = set([
    'spring', 'summer', 'fall', 'winter', 'autumn', 'resort', 'pre-fall',
    'pre-spring', 'pre-summer', 'holiday', 'runway', 'catwalk', 'fashion',
    'week', 'weeks', 'collection', 'collections', 'show', 'shows', 'presentation',
    'presentations', 'event', 'events', 'campaign', 'campaigns', 'season', 'seasons',
    'cruise', 'cruise collection', 'bridal', 'bridal week', 'couture', 'haute couture',
    'high fashion', 'ready-to-wear', 'RTW', 'menswear', 'womenswear', 'kidswear',
    'childrenswear', 'teenwear', 'teen fashion', 'plus size', 'petite', 'runway show',
    'fashion show', 'fashion shows', 'trade show', 'trade shows', 'fashion fair',
    'fashion fairs', 'fashion festival', 'fashion festivals', 'fashion gala',
    'fashion galas', 'met gala', 'red carpet', 'red carpet events', 'fashion awards',
    'fashion award', 'style awards', 'style award', 'fashion month', 'fashion months',
    'trend', 'trends', 'trend forecasting', 'trend report', 'style report', 'style reports',
    'seasonal', 'pre-collection', 'pre-collections', 'fashion week', 'fashion weeks',
    'nyfw', 'lfw', 'mfw', 'pfw', 'new york fashion week', 'london fashion week',
    'milan fashion week', 'paris fashion week', 'men\'s fashion week', 'women\'s fashion week', 'runways'
])

combined_stop_words = standard_stop_words.union(fashion_stop_words)
combined_stop_words = combined_stop_words.union(fashion_verbs)
combined_stop_words = combined_stop_words.union(shopping_retail_terms)
combined_stop_words = combined_stop_words.union(fashion_events_seasons)

df['headline_tokens'] = df['headline_tokens'].apply(
    lambda x: [word for word in x if word not in combined_stop_words])
df['cleaned_headline'] = df['headline_tokens'].apply(lambda x: ' '.join(x))

# Trend analysis
all_words = ' '.join(df['cleaned_headline']).split()
word_freq = Counter(all_words)
common_words = word_freq.most_common(20)
print(common_words)

# Bigram analysis
bigrams = ngrams(all_words, 2)
bigram_freq = Counter(bigrams)
common_bigrams = bigram_freq.most_common(20)
print(common_bigrams)


vectorizer = CountVectorizer(max_df=0.95, min_df=2, stop_words='english')
dtm = vectorizer.fit_transform(df['cleaned_headline'])

lda = LatentDirichletAllocation(n_components=5, random_state=42)
lda.fit(dtm)

with open('topics.txt', 'w') as f:
    for index, topic in enumerate(lda.components_):
        f.write(f'Topic {index}:\n')
        words = [vectorizer.get_feature_names_out()[i]
                 for i in topic.argsort()[-10:]]
        f.write(", ".join(words) + '\n\n')

print("Topics have been saved to 'topics.txt'.")
