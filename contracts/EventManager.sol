// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
pragma abicoder v2;

import "@ensdomains/ens/contracts/ENS.sol";
import "@ensdomains/ens/contracts/ENSRegistry.sol";

contract EventRegistration {
    struct Event {
        string name;
        uint256 date;
        EventOrganizer organizer;
        string ensName;
    }

    struct EventOrganizer {
        address organizerAddress;
        string organizerName;
        string organizerEmail;
    }

    Event[] events;

    mapping(address => bool) public organizers;
    mapping(address => mapping(string => bool)) public registered;
    mapping(address => mapping(string => bool)) public attended;

    ENSRegistry public ens;

    event EventAdded(string name, uint256 date, string ensName, address organizer, string organizerName, string organizerEmail);
    event Registration(address indexed attendee, string eventName, uint256 eventDate, uint256 timestamp);
    event AttendanceConfirmed(string eventName, uint256 eventDate, address attendee, uint256 timestamp);

    modifier onlyOrganizer() {
        require(organizers[msg.sender], "Only organizers can perform this action.");
        _;
    }

    constructor(address ensAddress) {
        ens = ENSRegistry(ensAddress);
    }

    function addEventWithENS(
        string memory name,
        uint256 date,
        string memory ensName,
        string memory organizerName,
        string memory organizerEmail
    ) public {
        EventOrganizer memory organizer = EventOrganizer(msg.sender, organizerName, organizerEmail);
        Event memory newEvent = Event(name, date, organizer, ensName);
        events.push(newEvent);

        emit EventAdded(name, date, ensName, msg.sender, organizerName, organizerEmail);
    }

    function becomeOrganizer() public {
        organizers[msg.sender] = true;
    }

    function register(string memory ensName) public {
        require(!registered[msg.sender][ensName], "You are already registered for this event.");

        address eventAddress = resolveENSName(ensName);
        require(eventAddress != address(0), "Event not found.");

        Event storage selectedEvent = getEventByENSName(ensName);
        require(selectedEvent.organizer.organizerAddress == eventAddress || selectedEvent.organizer.organizerAddress == msg.sender, "You cannot register for this event.");

        registered[msg.sender][ensName] = true;
        emit Registration(msg.sender, selectedEvent.name, selectedEvent.date, block.timestamp);
    }

    function confirmAttendance(string memory ensName) public {
        Event storage selectedEvent = getEventByENSName(ensName);
        require(selectedEvent.organizer.organizerAddress == msg.sender || attended[msg.sender][ensName], "You cannot confirm attendance for this event.");

        attended[msg.sender][ensName] = true;
        emit AttendanceConfirmed(selectedEvent.name, selectedEvent.date, msg.sender, block.timestamp);
    }

    function checkAttendance(string memory ensName, address attendee) public view returns (bool) {
        Event storage selectedEvent = getEventByENSName(ensName);
        return attended[attendee][ensName];
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
            if (attended[attendee][events[i].ensName]) {
                userEvents[count] = events[i];
                count++;
            }
        }
        assembly {
            mstore(userEvents, count)
        }
        return userEvents;
    }

    function alternativeNameHash(string memory ensName) internal pure returns (bytes32) {
        bytes32 hash = keccak256(abi.encodePacked(bytes32(0), keccak256(bytes(ensName))));
        return hash;
    }


    function resolveENSName(string memory ensName) public view returns (address) {
        bytes32 node = alternativeNameHash(ensName);
        return ens.resolver(node);
    }

    function getEventByENSName(string memory ensName) internal view returns (Event storage) {
        for (uint256 i = 0; i < events.length; i++) {
            if (keccak256(bytes(events[i].ensName)) == keccak256(bytes(ensName)) && events[i].organizer.organizerAddress != address(0)) {
                return events[i];
            }
        }
        revert("Event not found.");
    }
}