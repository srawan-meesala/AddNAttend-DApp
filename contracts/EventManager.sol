// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EventManager {
    struct Event {
        string name;
        uint date;
        string location;
        address owner;
        address[] attendees;
    }

    Event[] public events;
    address public contractOwner;

    constructor() {
        contractOwner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == contractOwner, "Only the owner can perform this action");
        _;
    }

    function createEvent(string memory _name, uint _duration, string memory _location) public {
        uint eventDate = block.timestamp + _duration;
        require(eventDate > block.timestamp, "Invalid event duration");
        Event memory newEvent = Event({
            name: _name,
            date: eventDate,
            location: _location,
            owner: msg.sender,
            attendees: new address[](0)
        });
        events.push(newEvent);
    }


    function confirmAttendance(uint _eventId) public {
        require(_eventId < events.length, "Event does not exist");
        Event storage selectedEvent = events[_eventId];
        require(!hasConfirmedAttendance(selectedEvent.attendees, msg.sender), "You've already confirmed attendance");
        require(selectedEvent.date > block.timestamp, "Event date has already passed");
        
        // Add the attendee's address to the attendees array
        selectedEvent.attendees.push(msg.sender);
    }

    function hasConfirmedAttendance(address[] storage attendees, address user) internal view returns (bool) {
        for (uint i = 0; i < attendees.length; i++) {
            if (attendees[i] == user) {
                return true;
            }
        }
        return false;
    }


    function getEventCount() public view returns (uint) {
        return events.length;
    }

    function getEvent(uint _eventId) public view returns (string memory, uint, string memory, bool, address) {
        require(_eventId < events.length, "Event does not exist");
        Event storage selectedEvent = events[_eventId];
        bool isAttending = false;
        for (uint i = 0; i < selectedEvent.attendees.length; i++) {
            if (selectedEvent.attendees[i] == msg.sender) {
                isAttending = true;
                break;
            }
        }
        return (selectedEvent.name, selectedEvent.date, selectedEvent.location, isAttending, selectedEvent.owner);
    }
}
