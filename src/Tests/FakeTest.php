<?php
namespace DzielneMisie\ReviewAssists\Tests;

use PHPUnit_Framework_TestCase;
/**
 * This is just a fake test that I will use to configure travis.
 *
 * @author Maciej Iwanowski <kasztelix@gmail.com>
 */
class FakeTest extends PHPUnit_Framework_TestCase
{
    public function testPass()
    {
        $this->assertSame(1.1, 1.1);
    }
    
    public function testFail()
    {
        $this->assertSame(1.0, 1);
    }
}
