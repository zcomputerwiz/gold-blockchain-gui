#!/bin/bash
set -e

#git clone https://github.com/silicoin-network/silicoin-blockchain.git -b 1.1.7 chia-blockchain

#cd chia-blockchain

# Get submodules
#git submodule update --init --recursive


python3 -m venv venv
. ./venv/bin/activate

python3 -m pip install --upgrade pip
python3 -m pip install wheel

python3 -m pip install --extra-index-url https://pypi.chia.net/simple/ miniupnpc==2.1
python3 -m pip install -e . --extra-index-url https://pypi.chia.net/simple/
