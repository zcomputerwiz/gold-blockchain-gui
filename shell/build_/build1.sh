#!/bin/bash
#build_scripts

pip install setuptools_scm
pip install pyinstaller==4.2


echo "Create dist/"
sudo rm -rf dist
mkdir dist


SPEC_FILE=$(python -c 'import chia; print(chia.PYINSTALLER_SPEC_PATH)')
pyinstaller --log-level=INFO "$SPEC_FILE"
LAST_EXIT_CODE=$?
if [ "$LAST_EXIT_CODE" -ne 0 ]; then
	echo >&2 "pyinstaller failed!"
	exit $LAST_EXIT_CODE
fi

#daemon
#cp -r dist/daemon ../chia-blockchain-gui

