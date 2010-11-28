MessageParserTest = TestCase("MessageParserTest", {


    test_one_message_with_a_sub_message:function() {
        var messageParser = new MessageParser();
        var messages = messageParser.parse("A.Method()\n{\nB.Method()\n}");
        assertEquals(1, messages.length);
        assertEquals("CLIENT", messages[0].from);
        assertEquals(messages[0].to, "A");
        assertEquals(messages[0].message, "Method()");
        assertEquals(messages[0].subMessages.length, 1);
    },

    test_one_message_with_two_sub_message:function() {
        var messageParser = new MessageParser();
        var messages = messageParser.parse("A.MethodA()\n{\nB.MethodB()\nC.MethodC()\n}");
        assertEquals(1, messages.length);
        var messageA = messages[0];
        assertEquals("CLIENT", messageA.from);
        assertEquals(messageA.to, "A");
        assertEquals(messageA.message, "MethodA()");
        assertEquals(messageA.subMessages.length, 2);

        var messageB = messageA.subMessages[0];
        assertEquals("A", messageB.from);
        assertEquals(messageB.to, "B");
        assertEquals(messageB.message, "MethodB()");
        assertEquals(messageB.subMessages.length, 0);

        var messageC = messageA.subMessages[1];
        assertEquals("A", messageC.from);
        assertEquals(messageC.to, "C");
        assertEquals(messageC.message, "MethodC()");
        assertEquals(messageC.subMessages.length, 0);
    },

    /**
     * A.MethodA()
     * A1.MethodA1{
     *   B.MethodB(){
     *     D.MethodD()
     *   }
     *   C.MethodC()
     * }
     */
    test_one_message_with_more_sub_message:function() {
        var messageParser = new MessageParser();
        var messages = messageParser.parse("A.MethodA()\nA1.MethodA1\n{\nB.MethodB()\n{\nD.MethodD()\n}\nC.MethodC()\n}");
        assertEquals(2, messages.length);
        var messageA = messages[0];
        assertEquals("CLIENT", messageA.from);
        assertEquals(messageA.to, "A");
        assertEquals(messageA.message, "MethodA()");
        assertEquals(0, messageA.subMessages.length);
        var messageA1 = messages[1];

        var messageB = messageA1.subMessages[0];
        assertEquals("A1", messageB.from);
        assertEquals(messageB.to, "B");
        assertEquals(messageB.message, "MethodB()");
        assertEquals(1, messageB.subMessages.length);

        var messageC = messageA1.subMessages[1];
        assertEquals("A1", messageC.from);
        assertEquals(messageC.to, "C");
        assertEquals(messageC.message, "MethodC()");
        assertEquals(0, messageC.subMessages.length);
    }

});
