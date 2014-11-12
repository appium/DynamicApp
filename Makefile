default:
	@echo "make prepare_ios_sim_zip --> Prepare iOS simulator zip"

prepare_ios_sim_zip:
	cd DynamicApp/build/iphone/build/Debug-iphonesimulator && zip -r ./DynamicApp.app.zip ./DynamicApp.app
	mv ./DynamicApp/build/iphone/build/Debug-iphonesimulator/DynamicApp.app.zip ./assets/ios/simulator/

prepare_android_apk:
	cp ./DynamicApp/build/android/bin/DynamicApp.apk ./assets/android/

prepare_all: prepare_ios_sim_zip prepare_android_apk

