// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

import "@ensdomains/ens/contracts/ENS.sol";

contract EventManager {
    struct Event {
        string name;
        uint256 date;
        EventOrganizer organizer;
        bytes32 ensNameHash;
    }

    struct EventOrganizer {
        address organizerAddress;
    }


    Event[] events;

    mapping(address => bool) public organizers;
    mapping(address => mapping(bytes32 => bool)) public registered;
    mapping(address => mapping(bytes32 => bool)) public attended;

    ENS public ens;

    event EventAdded(string name, uint256 date, string ensName, address organizer);
    event Registration(address indexed attendee, string eventName, uint256 eventDate, uint256 timestamp);
    event AttendanceConfirmed(string eventName, uint256 eventDate, address attendee, uint256 timestamp);

    modifier onlyOrganizer() {
        require(organizers[msg.sender], "Only organizers can perform this action.");
        _;
    }

    constructor(ENS ensAddress) {
        ens = ensAddress;
    }

    function addEventWithENS(
        string memory name,
        uint256 date,
        string memory ensName
    ) public {
        bytes32 ensNameHash = keccak256(abi.encodePacked(ensName));
        EventOrganizer memory organizer = EventOrganizer(msg.sender);
        address eventAddress = resolveENSName(ensName);
        require(eventAddress != address(0), "ENS name does not resolve to an address.");

        Event memory newEvent = Event(name, date, organizer, ensNameHash);
        events.push(newEvent);

        emit EventAdded(name, date, ensName, msg.sender);
    }

    function becomeOrganizer() public {
        organizers[msg.sender] = true;
    }

    function register(string memory ensName) public {
        bytes32 ensNameHash = keccak256(abi.encodePacked(ensName));
        require(!registered[msg.sender][ensNameHash], "You are already registered for this event.");

        address eventAddress = resolveENSName(ensName);
        require(eventAddress != address(0), "Event not found.");

        Event storage selectedEvent = getEventByENSName(ensNameHash);
        require(selectedEvent.organizer.organizerAddress != msg.sender, "Organizers cannot register for their own events.");

        registered[msg.sender][ensNameHash] = true;
        emit Registration(msg.sender, selectedEvent.name, selectedEvent.date, block.timestamp);
    }


    function confirmAttendance(string memory ensName, address attendee) public {
        bytes32 ensNameHash = keccak256(abi.encodePacked(ensName));
        Event storage selectedEvent = getEventByENSName(ensNameHash);
        require(selectedEvent.organizer.organizerAddress == msg.sender, "Only the organizer can confirm attendance.");
        require(!attended[attendee][ensNameHash], "The attendee has already confirmed attendance for this event.");
        attended[attendee][ensNameHash] = true;
        emit AttendanceConfirmed(selectedEvent.name, selectedEvent.date, attendee, block.timestamp);
    }


    function checkAttendance(string memory ensName, address attendee) public view returns (bool) {
        bytes32 ensNameHash = keccak256(abi.encodePacked(ensName));
        return attended[attendee][ensNameHash];
    }

    function getEventsOrganizedByUser(address organizerAddress) public view returns (Event[] memory) {
        Event[] memory userEvents = new Event[](events.length);
        uint256 count = 0;
        for (uint256 i = 0; i < events.length; i++) {
            if (events[i].organizer.organizerAddress == organizerAddress) {
                userEvents[count] = events[i];
                count++;
            }
        }
        assembly {
            mstore(userEvents, count)
        }
        return userEvents;
    }

    function getEventsAttendedByUser(address attendee) public view returns (Event[] memory) {
        Event[] memory userEvents = new Event[](events.length);
        uint256 count = 0;
        for (uint256 i = 0; i < events.length; i++) {
            if (attended[attendee][events[i].ensNameHash]) {
                userEvents[count] = events[i];
                count++;
            }
        }
        assembly {
            mstore(userEvents, count)
        }
        return userEvents;
    }

    function getEventsRegisteredByUser(address attendee) public view returns (Event[] memory) {
        Event[] memory userEvents = new Event[](events.length);
        uint256 count = 0;
        
        for (uint256 i = 0; i < events.length; i++) {
            bytes32 ensNameHash = events[i].ensNameHash;
            if (registered[attendee][ensNameHash]) {
                userEvents[count] = events[i];
                count++;
            }
        }
        Event[] memory registeredEvents = new Event[](count);
        for (uint256 i = 0; i < count; i++) {
            registeredEvents[i] = userEvents[i];
        }
        
        return registeredEvents;
    }


    function resolveENSName(string memory ensName) public view returns (address) {
        bytes32 node = keccak256(abi.encodePacked(ensName));
        return ens.resolver(node);
    }

    function getEventByENSName(bytes32 ensName) internal view returns (Event storage) {
        for (uint256 i = 0; i < events.length; i++) {
            if (events[i].ensNameHash == ensName && events[i].organizer.organizerAddress != address(0)) {
                return events[i];
            }
        }
        revert("Event not found.");
    }
}
