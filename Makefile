prepare_ios_sim_zip:
	pushd DynamicApp/build/iphone/build/Debug-iphonesimulator
	zip -r DynamicApp.app.zip DynamicApp.app
	popd
	mv DynamicApp/build/iphone/build/Debug-iphonesimulator/DynamicApp.app.zip assets/simulator/

