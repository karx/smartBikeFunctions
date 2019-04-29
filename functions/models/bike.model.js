export class Bike {
    generateRandom() {
        this.bikeGPSCords = '';
        this.bikeBatteryPercentage = 10;
        this.bikeSpeed = 10;
        this.bikeLockStatus = 'Locked';
        this.bikeDockingStatus= 'Docked';
        return this;
    }
};