# Requirements for tikat-tikat, the bus-booking Telegram bot by RedBus

## Overview
Build a Telegram-based bus booking bot that will allow any Telegram user to go to their chat and book a bus of their choice, using publically available APIs.

## Problem Statement
Recent estimates suggest Telegram has around 1 billion monthly active users globally, with roughly 22% (about 104 million) in India. Applying Telegram's global engagement ratio (≈45% of monthly users are daily active) implies on the order of 45–50 million daily active Telegram users in India, though Telegram does not publish official India-only DAU figures and this should be treated as an informed estimate rather than a precise number.

Recent reports from RedBus indicate that over 6 crore (60 million) bus tickets were booked on its platform in 2023, which corresponds to roughly 160,000–170,000 tickets per day on average (a derived estimate from annual volume, not a directly reported daily figure). Industry analyses suggest RedBus accounts for around 75% of the intercity online bus OTA market in India by gross booking value, implying that total online intercity bus bookings across major OTAs are roughly one‑third higher than RedBus alone, with the remaining volume spread across competitors such as AbhiBus, Paytm Bus, ixigo, and others.

Intercity bus travelers in India often discover and coordinate trips within Telegram (friends, work groups, travel planning), but completing a booking requires context-switching into standalone apps or clunky mobile web flows. This creates friction, drop-offs, and lost bookings for platforms like RedBus.

We believe that embedding a lightweight yet full-funnel RedBus booking experience directly inside Telegram, via the WebApp platform, can convert high-intent conversations into completed bookings with lower acquisition and re-engagement costs.

## User persona
**Target demographic:** 18-35 year olds using Telegram on a daily basis (this demographic represents more than 50% of all Indian Telegram users). These users typically exhibit the following traits:
- Already use Telegram daily for work and social groups
- Take intercity buses 3-6 times a year
- Prefer digital payments (GPay) over cash and are comfortable with mobile interfaces

### Pain points and opportunities
- The user has to install apps like RedBus to be able to make a bus booking.
- The person using Telegram has access to a very flexible system of mini-apps that could be embedded into Telegram directly. 
- Telegram is their work OS of choice, which means that all kinds of payments, chats, transactions, etc. happen through Telegram. 
- Telegram could also be used as a reliable customer support platform, allowing users to chat with RedBuzz support directly.

## Solution space
**Proposed solution:** Build a Telegram bot which leverages the extensive mini-app platform offered by Telegram (https://core.telegram.org/bots/webapps)

### User stories
Prioritized in the decreasing order of priority. MVP (must-have) requirements up till (3), good-to-have requirements till (7)

1. As a Telegram user, I should have an easy-to-use interactive interface which will allow me to navigate the UI, leveraging all the flexibility that the mini-app interface could offer.
2. As a Telegram user, I should be able to search for all the available buses that are present on the schedule that I enter between the source and the destination.
3. As a Telegram user, I should be able to make a choice and check availability of bus seats fetched in real time.
4. As a Telegram user, I should be able to get a price estimate of the bus that I'm booking.
5. As a Telegram user, I should be able to access the Telegram bot through a deeplink which could be present anywhere on the web so that I could be redirected to the Telegram app and avoid the need for installing an app.
6. As a Telegram user, I should be able to make a payment via a payment gateway like GPay or Apple Pay.

### Key user flows (v0)
1. New user booking flow
2. Search functionality for buses

## Metrics to optimize for
- DAU on the Telegram bot
- Bus bookings done exclusively through the Telegram bot

