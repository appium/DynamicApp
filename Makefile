default:
	@echo "make prepare_ios_sim_zip --> Prepare iOS simulator zip"

prepare_ios_sim_zip:
	cd DynamicApp/build/iphone/build/Debug-iphonesimulator && zip -r ./DynamicApp.app.zip ./DynamicApp.app
	mv ./DynamicApp/build/iphone/build/Debug-iphonesimulator/DynamicApp.app.zip ./assets/simulator/

