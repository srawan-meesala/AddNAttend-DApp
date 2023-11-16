// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./eventToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract AddnAttend is Ownable{
    struct User {
        string name;
        uint256[] events;
    }

    struct EventAttendance {
        address userAddress;
        bool attended;
    }

    enum EventStatus {
        Active,
        Closed,
        Cancelled
    }

    struct Event {
        uint256 _id;
        string _name;
        uint256 _seats;
        address _owner;
        uint256 _startTime;
        uint256 _endTime;
        EventStatus _status;
        EventAttendance[] _participants;
        uint256 _tokenRewardAmount; // Add underscore to the variable name
        bytes32 eventDomain;
        string _eventDomain;
    }

    event EventEvent(Event _event);

    address private ownerContract;
    mapping(address => User) public users;
    mapping(bytes32 => uint256[]) public eventsByDomain;
    mapping(uint256 => Event) public events;
    uint256 public nEvents;

    eventToken public myToken;

    constructor(address _myTokenAddress) {
        ownerContract = msg.sender;
        myToken = eventToken(_myTokenAddress); // Initialize MyToken contract
        nEvents = 0;
    }

    function getContractOwner() public view returns (address) {
        return ownerContract;
    }

    function updateUserProfile(string memory _name) public {
        users[msg.sender].name = _name;
    }

    function createEvent(
        string memory _name,
        uint256 _seats,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _tokenRewardAmount,
        string memory _eventDomain
    ) public {
        require(_tokenRewardAmount >= 0, "Invalid reward amount");
        bytes32 domainHash = keccak256(abi.encodePacked(_eventDomain));
        uint256[] memory numEvents = eventsByDomain[domainHash];
        require(numEvents.length == 0, "Event domain is already in use");
        uint256 _eventId = nEvents++;

        events[_eventId]._id = _eventId;
        events[_eventId]._name = _name;
        events[_eventId]._eventDomain = _eventDomain;
        events[_eventId]._seats = _seats;
        events[_eventId]._owner = msg.sender;
        events[_eventId]._startTime = _startTime;
        events[_eventId]._endTime = _endTime;
        events[_eventId]._status = EventStatus.Active;
        events[_eventId]._participants.push(EventAttendance(msg.sender, true));
        events[_eventId]._tokenRewardAmount = _tokenRewardAmount;
        events[_eventId].eventDomain = keccak256(abi.encodePacked(_eventDomain));

        users[msg.sender].events.push(_eventId);
        myToken.mint(msg.sender, _tokenRewardAmount * _seats);
        emit EventEvent(events[_eventId]);

        eventsByDomain[events[_eventId].eventDomain].push(_eventId);
    }

    function getEventsByDomain(string memory _eventDomain) public view returns (Event[] memory) {
        bytes32 domainHash = keccak256(abi.encodePacked(_eventDomain));
        uint256[] memory eventIds = eventsByDomain[domainHash];
        Event[] memory eventsInDomain = new Event[](eventIds.length);

        for (uint256 i = 0; i < eventIds.length; i++) {
            eventsInDomain[i] = events[eventIds[i]];
        }

        return eventsInDomain;
    }

    function closeEvent(uint256 _eventId) public {
        assertEventOwner(_eventId, msg.sender);

        events[_eventId]._status = EventStatus.Closed;

        distributeTokens(_eventId);
    }

    function getBalance() public view returns (uint256) {
        return myToken.balanceOf(msg.sender);
    }

    function getBalance2(address user) public view returns (uint256) {
        return myToken.balanceOf(user);
    }

    function cancelEvent(uint256 _eventId) public {
        assertEventOwner(_eventId, msg.sender);

        events[_eventId]._status = EventStatus.Cancelled;
    }

    function getEventsOrganisedByUser(address userAddress) public view returns (Event[] memory) {
        uint256[] memory organisedEventIds = new uint256[](users[userAddress].events.length);
        uint256 organisedEventCount = 0;
        
        for (uint256 i = 0; i < users[userAddress].events.length; i++) {
            uint256 eventId = users[userAddress].events[i];
            if (events[eventId]._owner == userAddress) {
                organisedEventIds[organisedEventCount] = eventId;
                organisedEventCount++;
            }
        }

        Event[] memory organisedEvents = new Event[](organisedEventCount);

        for (uint256 i = 0; i < organisedEventCount; i++) {
            uint256 eventId = organisedEventIds[i];
            organisedEvents[i] = events[eventId];
        }

        return organisedEvents;
    }


    function getAttendeesListByUser(address userAddress) public view returns (uint256[] memory) {
        uint256[] memory attendedEvents = users[userAddress].events;
        uint256[] memory attendeesList = new uint256[](attendedEvents.length);

        for (uint256 i = 0; i < attendedEvents.length; i++) {
            attendeesList[i] = attendedEvents[i];
        }
        return attendeesList;
    }

    function checkInEventParticipant2(string memory _eventDomain, address _userAddress) public {
        Event[] memory EventNew = getEventsByDomain(_eventDomain);
        require(EventNew[0]._id>=0, 'Event not found.');
        checkInEventParticipant(EventNew[0]._id, _userAddress);
    }

    function checkInEventParticipant(uint256 _eventId, address _userAddress) public {
        assertEventOwner(_eventId, msg.sender);
        assertParticipantExists(_eventId, _userAddress, true);

        for (uint256 i = 0; i < events[_eventId]._participants.length; i++) {
            if (events[_eventId]._participants[i].userAddress == _userAddress) {
                events[_eventId]._participants[i].attended = true;

                rewardAttendee(_eventId, _userAddress);

                break;
            }
        }
    }

    function registerToEvent(string memory _eventDomain) public {
        bytes32 domainHash = keccak256(abi.encodePacked(_eventDomain));
        uint256[] memory eventIds = eventsByDomain[domainHash];
        
        require(eventIds.length > 0, "No events found for the specified domain");

        bool userAlreadyRegistered = false;

        for (uint256 i = 0; i < eventIds.length; i++) {
            uint256 eventId = eventIds[i];
            if (!userAlreadyRegistered) {
                // Check if the user is already registered for this event
                for (uint256 j = 0; j < events[eventId]._participants.length; j++) {
                    if (events[eventId]._participants[j].userAddress == msg.sender) {
                        userAlreadyRegistered = true;
                        break;
                    }
                }

                if (!userAlreadyRegistered) {
                    // Register the user for the event
                    events[eventId]._participants.push(EventAttendance(msg.sender, false));
                    users[msg.sender].events.push(eventId);
                }
            }
        }
    }


    function getEvents() public view returns (Event[] memory) {
        Event[] memory eventList = new Event[](nEvents);

        for (uint256 i = 0; i < nEvents; i++) {
            eventList[i] = events[i];
        }

        return eventList;
    }

    function getEventParticipants(uint256 _eventId) public view returns (EventAttendance[] memory) {
        assertParticipantExists(_eventId, msg.sender, true);

        return events[_eventId]._participants;
    }

    /* Internal */

    function assertEventExists(uint256 _eventId) internal view {
        require(bytes(events[_eventId]._name).length > 0, "Event does not exist");
    }

    function assertEventOwner(uint256 _eventId, address _userAddress) internal view {
        require(events[_eventId]._owner == _userAddress, "User does not own the event");
    }

    function assertParticipantExists(uint256 _eventId, address _userAddress, bool _shouldExist) internal view {
        assertEventExists(_eventId);

        bool _exists = participantExists(_eventId, _userAddress);

        require(
            _exists == _shouldExist,
            _shouldExist
                ? "User is not attending the event"
                : "User is already attending the event"
        );
    }

    function participantExists(uint256 _eventId, address _userAddress) private view returns (bool) {
        for (uint256 i = 0; i < events[_eventId]._participants.length; i++) {
            if (events[_eventId]._participants[i].userAddress == _userAddress) {
                return true;
            }
        }
        return false;
    }

    function distributeTokens(uint256 _eventId) private {
        Event storage selectedEvent = events[_eventId];
        for (uint256 i = 0; i < selectedEvent._participants.length; i++) {
            if (selectedEvent._participants[i].attended) {
                address attendee = selectedEvent._participants[i].userAddress;
                uint256 rewardAmount = selectedEvent._tokenRewardAmount;

                myToken.transfer(attendee, rewardAmount);
            }
        }
    }

    function rewardAttendee(uint256 _eventId, address _userAddress) private {
        uint256 rewardAmount = events[_eventId]._tokenRewardAmount;
        myToken.transferTokens(msg.sender,_userAddress, rewardAmount);
    }
}
